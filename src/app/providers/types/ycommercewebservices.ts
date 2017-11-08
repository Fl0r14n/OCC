export interface CardTypeWsDTO {
  code?: string
  name?: string
}

export interface CardTypeListWsDTO {
  cardTypes?: CardTypeWsDTO[]
}

export interface AbstractCatalogItemWsDTO {
  id?: string
  lastModified?: string
  name?: Date
  url?: URL
}

export interface CategoryHierarchyWsDTO extends AbstractCatalogItemWsDTO {
  subcategories?: CategoryHierarchyWsDTO
}

export interface CatalogVersionWsDTO extends AbstractCatalogItemWsDTO {
  categories?: CategoryHierarchyWsDTO[]
}

export interface CatalogWsDTO extends AbstractCatalogItemWsDTO {
  catalogVersions?: CatalogVersionWsDTO[]
}

export interface CatalogListWsDTO {
  catalogs?: CatalogWsDTO[]
}

export interface LanguageWsDTO {
  isocode?: string
  name?: string
  nativeName?: string
  active?: boolean
}

export interface CurrencyWsDTO {
  isocode?: string
  name?: string
  active?: boolean
  symbol?: string
}

export interface CurrencyListWsDTO {
  currencies?: CurrencyWsDTO[]
}

export interface PrincipalWsDTO {
  uid?: string
  name?: string
}

export interface UserWsDTO {
  defaultAddress?: AddressWsDTO
  titleCode?: string
  title?: string
  firstName?: string
  lastName?: string
  currency?: CurrencyWsDTO
  language?: LanguageWsDTO
  displayUid?: string
  customerId?: string
  uid?: string
  name?: string
}

export interface AddressWsDTO {
  id?: string
  title?: string
  titleCode?: string
  firstName?: string
  lastName?: string
  companyName?: string
  line1?: string
  line2?: string
  town?: string
  region?: RegionWsDTO
  postalCode?: string
  phone?: string
  email?: string
  country?: CountryWsDTO
  shippingAddress?: boolean
  defaultAddress?: boolean
  visibleInAddressBook?: boolean
  formattedAddress?: string
}

export interface RegionWsDTO {
  isocode?: string
  isocodeShort?: string
  countryIso?: string
  name?: string
}

export interface UserGroupWsDTO extends PrincipalWsDTO {
  members?: PrincipalWsDTO[]
  subGroups?: UserGroupWsDTO[]
  membersCount?: number
}

export interface UserGroupListWsDTO {
  userGroups?: UserGroupWsDTO[]
}

export interface CountryWsDTO {
  isocode?: string
  name?: string
}

export interface CountryListWsDTO {
  countries?: CountryWsDTO[]
}

export interface StockWsDTO {
  stockLevelStatus?: string
  stockLevel?: number
}

export interface FutureStockWsDTO {
  stock?: StockWsDTO
  date?: Date
  formattedDate?: string
}

export interface PriceWsDTO {
  currencyIso?: string
  value?: number
  priceType?: string
  formattedValue?: string
  minQuantity?: number
  maxQuantity?: number
}

export interface ImageWsDTO {
  imageType?: string
  format?: string
  url?: URL
  altText?: string
  galleryIndex?: number
}

export interface CategoryWsDTO {
  code?: string
  url?: URL
  image?: ImageWsDTO
}

export interface ReviewWsDTO {
  id?: string
  headline?: string
  comment?: string
  rating?: number
  date?: Date
  alias?: string
  principal?: UserWsDTO
}

export interface ClassificationWsDTO {
  code?: string
  name?: string
  features?: FeatureWsDTO[]
}

export interface FeatureWsDTO {
  code?: string
  name?: string
  description?: string
  type?: string
  range?: boolean
  comparable?: boolean
  featureUnit?: FeatureUnitWsDTO
  featureValues?: FeatureValueWsDTO[]
}

export interface FeatureUnitWsDTO {
  symbol?: string
  name?: string
  unitType?: string
}

export interface FeatureValueWsDTO {
  value?: string
}

export interface PromotionWsDTO {
  code?: string
  title?: string
  promotionType?: string
  startDate?: Date
  endDate?: Date
  description?: string
  couldFireMessages?: string[]
  firedMessages?: string[]
  productBanner?: ImageWsDTO[]
  enabled?: boolean
  priority?: number
  promotionGroup?: string
  restrictions?: PromotionRestrictionWsDTO[]
}

export interface PromotionRestrictionWsDTO {
  restrictionType?: string
  description?: string
}

export interface VariantOptionWsDTO {
  code?: string
  stock?: StockWsDTO
  url?: URL
  priceData?: PriceWsDTO
  variantOptionQualifiers?: VariantOptionQualifierWsDTO[]
}

export interface VariantOptionQualifierWsDTO {
  qualifier?: string
  name?: string
  value?: string
  image?: ImageWsDTO
}

export interface BaseOptionWsDTO {
  variantType?: string
  options?: VariantOptionWsDTO[]
  selected?: VariantOptionWsDTO
}

export interface ProductReferenceWsDTO {
  preselected?: boolean
  referenceType?: string
  description?: string
  quantity?: number
  target?: ProductWsDTO
}

export interface VariantMatrixElementWsDTO {
  variantValueCategory?: VariantValueCategoryWsDTO
  parentVariantCategory?: VariantCategoryWsDTO
  variantOption?: VariantOptionWsDTO
  elements?: VariantMatrixElementWsDTO[]
  isLeaf?: boolean
}

export interface VariantValueCategoryWsDTO {
  name?: string
  sequence?: string
  superCategories?: VariantCategoryWsDTO[]
}

export interface VariantCategoryWsDTO {
  name?: string
  hasImage?: boolean
  priority?: number
}

export interface PriceRangeWsDTO {
  maxPrice?: PriceWsDTO
  minPrice?: PriceWsDTO
}

export interface ProductWsDTO {
  code?: string
  name?: string
  url?: URL
  description?: string
  purchasable?: boolean
  stock?: StockWsDTO
  futureStocks?: FutureStockWsDTO[]
  availableForPickup?: boolean
  averageRating?: number
  numberOfReviews?: number
  summary?: string
  manufacturer?: string
  variantType?: string
  price?: PriceWsDTO
  baseProduct?: string
  images?: ImageWsDTO[]
  categories?: CategoryWsDTO[]
  reviews?: ReviewWsDTO[]
  classifications?: ClassificationWsDTO[]
  potentialPromotions?: PromotionWsDTO[]
  variantOptions?: VariantOptionWsDTO[]
  baseOptions?: BaseOptionWsDTO[]
  volumePricesFlag?: boolean
  productReferences?: ProductReferenceWsDTO[]
  variantMatrix?: VariantMatrixElementWsDTO[]
  priceRange?: PriceRangeWsDTO[]
  multidimensional?: boolean
}

export interface ProductListWsDTO {
  products?: ProductWsDTO[]
  catalog?: string
  version?: string
  totalProductCount?: number
  totalPageCount?: number
  currentPage: number
}

export interface OrderStatusUpdateElementWsDTO {
  code?: string
  status?: string
  baseSiteId?: string
}

export interface OrderStatusUpdateElementListWsDTO {
  orderStatusUpdateElements?: OrderStatusUpdateElementWsDTO[]
}

export interface LanguageWsDTO {
  isocode?: string
  name?: string
  nativeName?: string
  active?: boolean
}

export interface LanguageListWsDTO {
  languages?: LanguageWsDTO[]
}

export interface TimeWsDTO {
  hour?: string
  minute?: string
  formattedHour?: string
}

export interface OpeningDayWsDTO {
  openingTime?: TimeWsDTO
  closingTime?: TimeWsDTO
}

export interface WeekdayOpeningDayWsDTO extends OpeningDayWsDTO {
  weekDay?: string
  closed?: boolean
}

export interface SpecialOpeningDayWsDTO extends OpeningDayWsDTO {
  date?: Date
  formattedDate?: string
  closed?: boolean
  name?: string
  comment?: string
}

export interface OpeningScheduleWsDTO {
  name?: string
  code?: string
  weekDayOpeningList?: WeekdayOpeningDayWsDTO[]
  specialDayOpeningList?: SpecialOpeningDayWsDTO[]
}

export interface GeoPointWsDTO {
  latitude?: number
  longitude?: number
}

export interface PointOfServiceWsDTO {
  name?: string
  displayName?: string
  url?: URL
  description?: string
  openingHours?: OpeningScheduleWsDTO
  storeContent?: string
  features?: Object
  geoPoint?: GeoPointWsDTO
  formattedDistance?: string
  distanceKm?: number
  mapIcon?: ImageWsDTO
  address?: AddressWsDTO
  storeImages?: ImageWsDTO[]
}

export interface ConsignmentEntryWsDTO {
  orderEntry?: OrderEntryWsDTO
  quantity?: number
  shippedQuantity?: number
}

export interface ConsignmentWsDTO {
  code?: string
  trackingID?: string
  status?: string
  statusDate?: Date
  entries?: ConsignmentEntryWsDTO[]
  shippingAddress?: AddressWsDTO
  deliveryPointOfService?: PointOfServiceWsDTO
}

export interface OrderEntryWsDTO {
  entryNumber?: number
  quantity?: number
  basePrice?: PriceWsDTO
  totalPrice?: PriceWsDTO
  product?: ProductWsDTO
  updateable?: boolean
  deliveryMode?: DeliveryModeWsDTO
  deliveryPointOfService?: PointOfServiceWsDTO
}

export interface DeliveryModeWsDTO {
  code?: string
  name?: string
  description?: string
  deliveryCost?: PriceWsDTO
}

export interface CardTypeWsDTO {
  code?: string
  name?: string
}

export interface PaymentDetailsWsDTO {
  id?: string
  accountHolderName?: string
  cardType?: CardTypeWsDTO
  cardNumber?: string
  startMonth?: string
  startYear?: string
  expiryMonth?: string
  expiryYear?: string
  issueNumber?: string
  subscriptionId?: string
  saved?: boolean
  defaultPayment?: boolean
  billingAddress?: AddressWsDTO
}

export interface PromotionOrderEntryConsumedWsDTO {
  code?: string
  adjustedUnitPrice?: number
  orderEntryNumber?: number
  quantity?: number
}

export interface PromotionResultWsDTO {
  description?: string
  promotion?: PromotionWsDTO
  consumedEntries?: PromotionOrderEntryConsumedWsDTO[]
}

export interface VoucherWsDTO {
  code?: string
  voucherCode?: string
  name?: string
  description?: string
  value?: number
  valueFormatted?: string
  valueString?: string
  freeShipping?: boolean
  currency?: CurrencyWsDTO
  appliedValue?: PriceWsDTO
}

export interface PickupOrderEntryGroupWsDTO {
  distance?: number
  totalPriceWithTax?: PriceWsDTO
  entries?: OrderEntryWsDTO[]
  quantity?: number
}

export interface DeliveryOrderEntryGroupWsDTO {
  deliveryAddress?: AddressWsDTO
  totalPriceWithTax?: PriceWsDTO
  entries?: OrderEntryWsDTO[]
  quantity?: number
}

export interface OrderWsDTO {
  created?: Date
  status?: string
  statusDisplay?: string
  guestCustomer?: boolean
  consignments?: ConsignmentWsDTO[]
  deliveryStatus?: string
  deliveryStatusDisplay?: string
  unconsignedEntries?: OrderEntryWsDTO[]
  code?: string
  net?: boolean
  totalPriceWithTax?: PriceWsDTO
  totalPrice?: PriceWsDTO
  totalTax?: PriceWsDTO
  subTotal?: PriceWsDTO
  deliveryCost?: PriceWsDTO
  entries?: OrderEntryWsDTO[]
  totalItems?: number
  deliveryMode?: DeliveryModeWsDTO
  deliveryAddress?: AddressWsDTO
  paymentInfo?: PaymentDetailsWsDTO
  appliedOrderPromotions?: PromotionResultWsDTO
  appliedProductPromotions?: PromotionResultWsDTO
  productDiscounts?: PriceWsDTO
  orderDiscounts?: PriceWsDTO
  totalDiscounts?: PriceWsDTO
  site?: string
  store?: string
  guid?: string
  calculated?: boolean
  appliedVouchers?: VoucherWsDTO[]
  user?: PrincipalWsDTO
  pickupOrderGroups?: PickupOrderEntryGroupWsDTO[]
  deliveryOrderGroups?: DeliveryOrderEntryGroupWsDTO[]
  pickupItemsQuantity?: number
  deliveryItemsQuantity?: number
}

export interface ProductExpressUpdateElementWsDTO {
  code?: string
  catalogId?: string
  catalogVersion?: string
}

export interface ProductExpressUpdateElementListWsDTO {
  productExpressUpdateElements?: ProductExpressUpdateElementWsDTO[]
}

export interface SpellingSuggestionWsDTO {
  suggestion?: string
  query?: string
}

export interface SortWsDTO {
  code?: string
  name?: string
  selected?: boolean
}

export interface PaginationWsDTO {
  totalPages?: number
  totalResults?: number
  pageSize?: number
  currentPage?: number
  sort?: string
}

export interface SearchQueryWsDTO {
  value?: string
}

export interface SearchStateWsDTO {
  url?: URL
  query?: SearchQueryWsDTO
}

export interface BreadcrumbWsDTO {
  facetCode?: string
  facetName?: string
  facetValueCode?: string
  facetValueName?: string
  removeQuery?: SearchStateWsDTO
  truncateQuery?: SearchStateWsDTO
}

export interface FacetValueWsDTO {
  name?: string
  count?: number
  query?: SearchStateWsDTO
  selected?: boolean
}

export interface FacetWsDTO {
  name?: string
  priority?: number
  category?: boolean
  multiSelect?: boolean
  visible?: boolean
  topValues?: FacetValueWsDTO[]
  values?: FacetValueWsDTO[]
}

export interface ProductSearchPageWsDTO {
  freeTextSearch?: string
  categoryCode?: string
  keywordRedirectUrl?: URL
  spellingSuggestion?: SpellingSuggestionWsDTO
  products?: ProductWsDTO[]
  sorts?: SortWsDTO[]
  pagination?: PaginationWsDTO
  currentQuery?: SearchStateWsDTO
  breadcrumbs?: BreadcrumbWsDTO[]
  facets?: FacetWsDTO[]
}

export interface SuggestionWsDTO {
  value?: string
}

export interface SuggestionListWsDTO {
  suggestions?: SuggestionWsDTO[]
}

export interface ProductReferenceListWsDTO {
  references?: ProductReferenceWsDTO[]
}

export interface ReviewListWsDTO {
  reviews?: ReviewWsDTO[]
}

export interface PointOfServiceStockWsDTO extends PointOfServiceWsDTO {
  stockInfo?: StockWsDTO
}

export interface StoreFinderSearchPageWsDTO {
  stores?: PointOfServiceStockWsDTO[]
  sorts?: SortWsDTO
  pagination?: PaginationWsDTO
  locationText?: string
  sourceLatitude?: number
  sourceLongitude?: number
  boundNorthLatitude?: number
  boundEastLongitude?: number
  boundSouthLatitude?: number
  boundWestLongitude?: number
}

export interface StoreFinderStockSearchPageWsDTO extends StoreFinderSearchPageWsDTO {
  product?: ProductWsDTO
}

export interface PromotionListWsDTO {
  promotions?: PromotionWsDTO[]
}

export interface TitleWsDTO {
  code?: string
  name?: string
}

export interface TitleListWsDTO {
  titles?: TitleWsDTO[]
}

export interface MemberListWsDTO {
  members?: PrincipalWsDTO[]
}

export interface UserSignUpWsDTO {
  uid?: string
  firstName?: string
  lastName?: string
  titleCode?: string
  password?: string
}

export interface AddressListWsDTO {
  addresses?: AddressWsDTO[]
}

export interface ErrorWsDTO {
  type?: string
  reason?: string
  message?: string
  subjectType?: string
  subject?: string
  language?: string
  position?: number
  exceptionMessage?: string
}

export interface ErrorListWsDTO {
  errors?: ErrorWsDTO[]
}

export interface AddressValidationWsDTO {
  errors?: ErrorListWsDTO
  decision?: string
  suggestedAddresses?: AddressWsDTO[]
}

export interface AbstractOrderWsDTO {
  code?: string
  net?: boolean
  totalPriceWithTax?: PriceWsDTO
  totalPrice?: PriceWsDTO
  totalTax?: PriceWsDTO
  subTotal?: PriceWsDTO
  deliveryCost?: PriceWsDTO
  entries?: OrderEntryWsDTO[]
  totalItems?: number
  deliveryMode?: DeliveryModeWsDTO
  deliveryAddress?: AddressWsDTO
  paymentInfo?: PaymentDetailsWsDTO
  appliedOrderPromotions?: PromotionResultWsDTO[]
  appliedProductPromotions?: PromotionResultWsDTO[]
  productDiscounts?: PriceWsDTO
  orderDiscounts?: PriceWsDTO
  totalDiscounts?: PriceWsDTO
  site?: string
  store?: string
  guid?: string
  calculated?: boolean
  appliedVouchers?: VoucherWsDTO[]
  user?: PrincipalWsDTO
  pickupOrderGroups?: PickupOrderEntryGroupWsDTO[]
  deliveryOrderGroups?: DeliveryOrderEntryGroupWsDTO[]
  pickupItemsQuantity?: number
  deliveryItemsQuantity?: number
}

export interface CartWsDTO extends AbstractOrderWsDTO {
  totalUnitCount?: number
  potentialOrderPromotions?: PromotionResultWsDTO[]
  potentialProductPromotions?: PromotionResultWsDTO[]
  name?: string
  description?: string
  expirationTime?: Date
  saveTime?: Date
  savedBy?: PrincipalWsDTO
}

export interface CartListWsDTO {
  carts?: CartWsDTO[]
}

export interface SaveCartResultWsDTO {
  savedCartData?: CartWsDTO
}

export interface DeliveryModeListWsDTO {
  deliveryModes?: DeliveryModeWsDTO[]
}
