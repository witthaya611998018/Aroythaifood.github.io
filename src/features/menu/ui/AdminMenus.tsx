import { useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  createMenuThunk,
  deleteMenuThunk,
  fetchMenusThunk,
  resetCreateMenuStatus,
  updateMenuThunk,
} from "@/features/menu/model/menuSlice";
import type { EditableMenuItem, MenuFormValues } from "@/features/menu/model/menuTypes";

import AdminMenuEditModal from "./AdminMenuEditModal";

type SelectedMenu = {
  sectionIndex: number;
  itemIndex: number;
};

const createEmptyMenu = (section: string): EditableMenuItem => ({
  name: "",
  desc: "",
  price: 0,
  img: "",
  section,
});

export default function AdminMenus() {
  const dispatch = useAppDispatch();
  const { sections, loading, error, createStatus } = useAppSelector((state) => state.menus);
  const token = useAppSelector((state) => state.auth.token);

  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("edit");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchMenusThunk());
  }, [dispatch]);

  useEffect(() => {
    if (createStatus !== "succeeded") {
      return;
    }

    void dispatch(fetchMenusThunk());
    handleCloseModal();
    dispatch(resetCreateMenuStatus());
  }, [createStatus, dispatch]);

  const selectedItem: EditableMenuItem | null = useMemo(() => {
    if (selectedMenu === null) return null;
    const section = sections[selectedMenu.sectionIndex];
    const item = section?.items[selectedMenu.itemIndex];
    if (!section) return null;
    if (modalMode === "create") {
      return createEmptyMenu(section.section);
    }
    if (!item) return null;

    return {
      ...item,
      section: section.section,
    };
  }, [modalMode, selectedMenu, sections]);

  const handleOpenModal = (sectionIndex: number, itemIndex: number) => {
    setModalMode("edit");
    setSelectedMenu({ sectionIndex, itemIndex });
    setLocalError(null);
  };

  const handleOpenCreateModal = (sectionIndex: number) => {
    setModalMode("create");
    setSelectedMenu({ sectionIndex, itemIndex: -1 });
    setLocalError(null);
  };

  const handleCloseModal = () => {
    setSelectedMenu(null);
    setModalMode("edit");
  };

  const handleSaveMenu = async (values: MenuFormValues) => {
    if (!token) {
      setLocalError("Please login first");
      return;
    }

    try {
      if (modalMode === "create") {
        await toast.promise(dispatch(createMenuThunk({ values, token })).unwrap(), {
          pending: "Creating menu...",
          success: "Menu created!",
          error: "Error creating menu!",
        });
      } else {
        if (!selectedItem?.id) {
          setLocalError("Menu id is missing");
          return;
        }


        await toast.promise(dispatch(
          updateMenuThunk({ id: selectedItem.id, values, token }),
        ).unwrap(), {
          pending: "Updating menu...",
          success: "Menu updated!",
          error: "Error updating menu!",
        });


        await dispatch(fetchMenusThunk()).unwrap();
        handleCloseModal();
      }
    } catch {
      // Global error is handled by redux state.
    }
  };

  const handleDeleteMenu = async () => {
    if (!token) {
      setLocalError("Please login first");
      return;
    }

    if (!selectedItem?.id) {
      setLocalError("Menu id is missing");
      return;
    }

    try {
      await toast.promise(dispatch(deleteMenuThunk({ id: selectedItem.id, token })).unwrap(), {
        pending: "Deleting menu...",
        success: "Menu deleted!",
        error: "Error deleting menu!",
      });

      await dispatch(fetchMenusThunk()).unwrap();
      handleCloseModal();
    } catch {
      // Global error is handled by redux state.
    }
  };

  if (loading && sections.length === 0) {
    return <p className="text-sm text-gray-500">Loading menu data...</p>;
  }

  return (
    <>
      {localError ? (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {localError}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <section key={section.section} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex whitespace-nowrap rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-600">
                {section.section}
              </div>

              <button
                type="button"
                onClick={() => handleOpenCreateModal(sectionIndex)}
                className="inline-flex items-center whitespace-nowrap rounded-md border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50"
              >
                <FiPlus className="mr-2" />
                Add New Menu
              </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {section.items.map((item, itemIndex) => (
                <button
                  key={`${section.section}-${item.id ?? item.name}-${itemIndex}`}
                  type="button"
                  onClick={() => handleOpenModal(sectionIndex, itemIndex)}
                  className="block h-full text-left"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-colors duration-200 hover:border-stone-300">
                    <div className="h-40 w-full overflow-hidden bg-stone-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="font-medium leading-7 text-gray-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {item.name}
                      </div>
                      {item.desc ? (
                        <p className="mb-3 overflow-hidden text-[14px] leading-5 text-gray-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                          {item.desc}
                        </p>
                      ) : null}
                      <div className="text-sm font-medium text-sky-700">
                        ${item.price}
                      </div>
                      <div className="mt-auto border-t border-stone-200 pt-3 text-xs text-gray-500">
                        Click to edit
                      </div>
                    </div>
                  </article>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Bounce}
        theme="light"
      />
      <AdminMenuEditModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        mode={modalMode}
        onClose={handleCloseModal}
        onDelete={handleDeleteMenu}
        onSave={handleSaveMenu}
      />
    </>
  );
}
