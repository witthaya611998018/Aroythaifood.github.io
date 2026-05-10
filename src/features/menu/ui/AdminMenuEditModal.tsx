import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Camera, X } from "lucide-react";

import type { EditableMenuItem, MenuFormValues } from "@/features/menu/model/menuTypes";

interface AdminMenuEditModalProps {
  isOpen: boolean;
  item: EditableMenuItem | null;
  mode?: "create" | "edit";
  onClose: () => void;
  onSave: (values: MenuFormValues) => void;
  onDelete: () => void;
}

export default function AdminMenuEditModal({
  isOpen,
  item,
  mode = "edit",
  onClose,
  onSave,
  onDelete,
}: AdminMenuEditModalProps) {
  const [formValues, setFormValues] = useState<MenuFormValues>({
    name: "",
    desc: "",
    price: "",
    section: "",
    img: "",
    imageFile: null,
  });
  const hasPreviewImage = Boolean(formValues.img);

  const resetFormValues = () => {
    setFormValues({
      name: "",
      desc: "",
      price: "",
      section: "",
      img: "",
      imageFile: null,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "create") {
      resetFormValues();
      return;
    }

    if (item) {
      setFormValues({
        name: item.name,
        desc: item.desc,
        price: String(item.price),
        section: item.section,
        img: item.img,
        imageFile: null,
      });
    }
  }, [item, isOpen, mode]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormValues((prev) => ({
      ...prev,
      img: previewUrl,
      imageFile: file,
    }));
  };

  useEffect(() => {
    return () => {
      if (formValues.imageFile && formValues.img.startsWith("blob:")) {
        URL.revokeObjectURL(formValues.img);
      }
    };
  }, [formValues.imageFile, formValues.img]);

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    onSave(formValues);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-[250ms] ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <TransitionChild
              as={DialogPanel}
              enter="transition-all duration-[250ms] ease-out"
              enterFrom="opacity-0 translate-y-3 scale-[0.97]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition-all duration-200 ease-in"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-[0.97]"
              className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl transform flex-col overflow-hidden rounded-lg bg-white shadow-xl sm:max-h-[calc(100vh-3rem)]"
            >
              <div className="flex items-center justify-between border-b border-stone-200 p-5">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {mode === "create" ? "Add New Menu" : "Edit Menu Item"}
                </DialogTitle>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-5 md:grid-cols-[290px_minmax(0,1fr)] md:items-start">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {mode === "create" ? "Add Image" : "Menu Image"}
                      </label>
                      <input
                        id="menu-image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="menu-image-upload"
                        className="group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[28px] border border-stone-200 bg-[radial-gradient(circle_at_top,_#f8fbff,_#edf3f9_55%,_#e6edf5)] transition hover:border-sky-200 "
                      >
                        {hasPreviewImage ? (
                          <div className="group relative h-auto w-full overflow-hidden bg-stone-100">
                            <img
                              src={formValues.img}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />

                            {/* Hover Button */}
                            <div className="absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sky-700 ring-8 ring-white/70 transition-all duration-300  group-hover:opacity-100 group-hover:scale-105">
                              <Camera className="size-6" strokeWidth={1.9} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-[78%] w-[78%] items-center justify-center rounded-full border-[10px] border-white bg-slate-100 shadow-inner">
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-slate-400 shadow-[0_16px_36px_rgba(15,23,42,0.12)] transition group-hover:text-sky-600">
                              <Camera className="size-12" strokeWidth={1.8} />
                            </div>
                          </div>
                        )}
                        {/* <div className="absolute right-5 bottom-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-sky-700 shadow-[0_16px_35px_rgba(15,23,42,0.16)] ring-8 ring-white/70 transition group-hover:scale-105">
                          <Camera className="size-7" strokeWidth={1.9} />
                        </div> */}
                      </label>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG, and WEBP files with a maximum size of 5 MB.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Menu Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formValues.price}
                          onChange={handleChange}
                          step="0.01"
                          required
                          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Section
                        </label>
                        <input
                          type="text"
                          name="section"
                          value={formValues.section}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-stone-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={formValues.desc}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-stone-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                </form>
              </div>

              <div className="flex items-center justify-end gap-3 rounded-b-[12px] border-t border-stone-200 p-4">
                {mode === "edit" ? (
                  <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-lg bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100"
                  >
                    Delete
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-stone-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition-colors hover:bg-sky-700"
                >
                  {mode === "create" ? "Create Menu" : "Save Changes"}
                </button>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
