import { apiRequest } from "@/shared/api/api";
import type { TypeFoodItem } from "@/features/typesfood/model/typefoodTypes";

type FindAllResponse = {
  result: TypeFoodItem[];
};

export const fetchTypeFoods = async (): Promise<TypeFoodItem[] | void> => {
  try {
    const response = await apiRequest<FindAllResponse>("/type/findAll");
    console.log("xxxxxxxxxxxxxxx", response.result);

    // return groupMenusBySection(response.result.map(normalizeApiMenu));
  } catch {
    // return "errror";
  }
};
