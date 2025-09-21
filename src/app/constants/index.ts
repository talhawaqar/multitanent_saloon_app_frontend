export const enum BusinessEntityStatus {
  Active = "active",
  Pending = "pending",
  Suspended = "suspended",
}

export enum UserProfileTypeCode {
  "ADMIM" = "AD",
  "BUSINESS_OWNER" = "BO",
  "MANAGER" = "MA",
  "CLIENT" = "CL",
}

export enum ModelStatus {
  Active = "active",
  InActive = "inactive",
}

export enum QueryKey {
  "BUSINESS_ENTITY_STATUS_COUNT" = "businessEntityStatusCount",
  "BUSINESS_ENTITY_BY_ID" = "businessEntityById",
  "LIST_ALL_BUSINESS_ENTITIES" = "listAllBusinessEntities",
  "LIST_MAIN_BUSINESS_ENTITY_INFO" = "listMainBusinessEntityInfo",
  "List_ALL_CATEGORIES" = "listAllCategories",
  "List_ALL_SERVICES" = "listAllServices",
  "LIST_ALL_ACTIVE_SERVICES" = "listAllActiveServices",
}
