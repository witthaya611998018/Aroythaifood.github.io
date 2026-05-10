import localMenuData from "@/features/menu/data/menu.json";
import type { MenuFormValues, MenuItem, MenuSection } from "@/features/menu/model/menuTypes";
import { apiRequest, buildApiUrl } from "@/shared/api/api";

type ApiMenu = {
  menu_id: number;
  menu_name: string;
  menu_description: string;
  menu_prices: number;
  menu_img?: string;
  typefood_id?: number;
};

type FindAllResponse = {
  result: ApiMenu[];
};

const SECTION_LABELS: Record<number, string> = {
  1: "Thai Food",
};

const resolveUploadsBaseUrl = (): string => {
  const override = import.meta.env.VITE_UPLOADS_BASE_URL as string | undefined;
  if (override) return override;

  try {
    return new URL("/uploads", buildApiUrl("/")).toString().replace(/\/$/, "");
  } catch {
    return "http://127.0.0.1:3001/uploads";
  }
};

const uploadsBaseUrl = resolveUploadsBaseUrl();

const normalizeMenuImage = (menuImg?: string): string => {
  if (!menuImg) return "/vite.svg";
  if (/^https?:\/\//i.test(menuImg) || menuImg.startsWith("/")) return menuImg;
  return `${uploadsBaseUrl}/images/${menuImg}`;
};

const normalizeApiMenu = (menu: ApiMenu): MenuItem => ({
  id: menu.menu_id,
  name: menu.menu_name,
  desc: menu.menu_description ?? "",
  price: Number(menu.menu_prices ?? 0),
  img: normalizeMenuImage(menu.menu_img),
  typefoodId: menu.typefood_id,
});

const groupMenusBySection = (menus: MenuItem[]): MenuSection[] => {
  const grouped = menus.reduce<Record<string, MenuItem[]>>((acc, menu) => {
    const typeId = menu.typefoodId ?? 1;
    const section = SECTION_LABELS[typeId] ?? `Section ${typeId}`;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(menu);
    return acc;
  }, {});

  return Object.entries(grouped).map(([section, items]) => ({ section, items }));
};

const normalizeLocalMenuData = (): MenuSection[] =>
  localMenuData.map((section) => ({
    section: section.section,
    items: section.items.map((item, index) => ({
      id: index + 1,
      name: item.name,
      price: Number(item.price),
      desc: item.desc,
      img: item.img,
      typefoodId: 1,
    })),
  }));

const typefoodIdFromSection = (section: string): number => {
  const found = Object.entries(SECTION_LABELS).find(
    ([, label]) => label.toLowerCase() === section.toLowerCase(),
  );
  return found ? Number(found[0]) : 1;
};

export const fetchMenuSections = async (): Promise<MenuSection[]> => {
  try {
    const response = await apiRequest<FindAllResponse>("/menus/findAll");
    return groupMenusBySection(response.result.map(normalizeApiMenu));
  } catch {
    return normalizeLocalMenuData();
  }
};

export const updateMenuItem = async (
  id: number,
  values: MenuFormValues,
  token: string,
): Promise<void> => {
  const formData = new FormData();
  formData.append("name_menu", values.name.trim());
  formData.append("description", values.desc.trim());
  formData.append("prices", values.price);
  formData.append("typefood_id", String(typefoodIdFromSection(values.section)));

  if (values.imageFile) {
    formData.append("image", values.imageFile);
  }

  await apiRequest(`/menus/updateMenu/${id}`, {
    method: "PUT",
    body: formData,
    token,
  });
};

export const createMenuItem = async (
  values: MenuFormValues,
  token: string,
): Promise<void> => {
  const formData = new FormData();
  formData.append("name_menu", values.name.trim());
  formData.append("description", values.desc.trim());
  formData.append("prices", values.price);
  formData.append("typefood_id", String(typefoodIdFromSection(values.section)));
  if (values.imageFile) {
    formData.append("image", values.imageFile);
  }

  await apiRequest("/menus/createMenu", {
    method: "POST",
    body: formData,
    token,
  });
};

export const deleteMenuItem = async (id: number, token: string): Promise<void> => {
  await apiRequest(`/menus/deleteMenu/${id}`, {
    method: "DELETE",
    token,
  });
};
