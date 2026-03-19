import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { listingsQuery, isNeonConfigured, type DbListing } from "@/lib/neon";

// Listing type definition
export interface Listing {
  id: string;
  title: string;
  type: "出售" | "收購";
  location: string;
  price: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  ownerName: string;
  sold?: boolean;
}

// Database type imported from neon.ts

// Convert from database format to app format
const fromDbListing = (db: DbListing): Listing => ({
  id: db.id,
  title: db.title,
  type: db.type,
  location: db.location,
  price: db.price,
  description: db.description,
  imageUrl: db.image_url,
  createdAt: db.created_at,
  ownerName: db.owner_name,
  sold: db.sold,
});

// Convert from app format to database format
const toDbListing = (listing: Partial<Listing>): Partial<DbListing> => {
  const db: Partial<DbListing> = {};
  if (listing.id !== undefined) db.id = listing.id;
  if (listing.title !== undefined) db.title = listing.title;
  if (listing.type !== undefined) db.type = listing.type;
  if (listing.location !== undefined) db.location = listing.location;
  if (listing.price !== undefined) db.price = listing.price;
  if (listing.description !== undefined) db.description = listing.description;
  if (listing.imageUrl !== undefined) db.image_url = listing.imageUrl;
  if (listing.createdAt !== undefined) db.created_at = listing.createdAt;
  if (listing.ownerName !== undefined) db.owner_name = listing.ownerName;
  if (listing.sold !== undefined) db.sold = listing.sold;
  return db;
};

// Initial listings data
const initialListings: Listing[] = [
  {
    id: "1",
    title: "國寶中投福座 - 華嚴世界單人位",
    type: "出售",
    location: "南投縣",
    price: "李先生",
    description: "龍寶興業股份有限公司發行，永久使用權狀，位置極佳",
    imageUrl: "/listings/S__83640575_0.jpg",
    createdAt: "2026-01-19",
    ownerName: "李先生",
    sold: true,
  },
  {
    id: "2",
    title: "基隆金寶塔 - 單人骨灰位",
    type: "出售",
    location: "基隆市",
    price: "王太太",
    description: "思恩區位置，基隆金寶塔建設開發股份有限公司，永久使用權",
    imageUrl: "/listings/S__83640574_0.jpg",
    createdAt: "2026-01-18",
    ownerName: "王太太",
    sold: false,
  },
  {
    id: "3",
    title: "福壽園 - 添福專案",
    type: "出售",
    location: "嘉義縣",
    price: "張先生",
    description: "添福專區，鼎磊實業有限公司發行，專案使用憑證",
    imageUrl: "/listings/S__83640573_0.jpg",
    createdAt: "2026-01-17",
    ownerName: "張先生",
    sold: true,
  },
  {
    id: "4",
    title: "北海福座 - 淨緣個人型",
    type: "出售",
    location: "新北市",
    price: "陳小姐",
    description: "福座開發股份有限公司，永久使用權狀，環境優美",
    imageUrl: "/listings/S__83640572_0.jpg",
    createdAt: "2026-01-16",
    ownerName: "陳小姐",
    sold: false,
  },
  {
    id: "5",
    title: "淡水宜城園區 - 火化土葬區個人位",
    type: "出售",
    location: "新北市淡水區",
    price: "林小姐",
    description: "私立宜城墓園，永久使用權狀，水源段552地號，殯葬用地",
    imageUrl: "/listings/S__83640571_0.jpg",
    createdAt: "2026-01-15",
    ownerName: "林小姐",
    sold: false,
  },
  {
    id: "6",
    title: "龍寶山 - 骨灰位",
    type: "出售",
    location: "新北市金山區",
    price: "黃先生",
    description: "航源事業股份有限公司，西一區位置，永久使用權",
    imageUrl: "/listings/S__83640534_0.jpg",
    createdAt: "2026-01-14",
    ownerName: "黃先生",
    sold: true,
  },
  {
    id: "7",
    title: "天璣文化園區 - 認購憑證",
    type: "出售",
    location: "新北市五股區",
    price: "吳太太",
    description: "宇垣開發有限公司發行，五股坑位置，含永久管理",
    imageUrl: "/listings/S__83640533_0.jpg",
    createdAt: "2026-01-13",
    ownerName: "吳太太",
    sold: false,
  },
  {
    id: "8",
    title: "慈雲寶塔 - 骨灰盒位",
    type: "出售",
    location: "嘉義縣水上鄉",
    price: "劉先生",
    description: "健鉦國殿納骨堂，4樓西區，塔位永久使用權狀",
    imageUrl: "/listings/S__83640532_0.jpg",
    createdAt: "2026-01-12",
    ownerName: "劉先生",
    sold: false,
  },
  {
    id: "9",
    title: "法藏山極樂寺 - 骨灰蓮座",
    type: "出售",
    location: "新北市石門區",
    price: "周先生",
    description: "信徒蓮座使用憑證，可自由轉讓，環境清幽莊嚴",
    imageUrl: "/listings/S__83640531_0.jpg",
    createdAt: "2026-01-11",
    ownerName: "周先生",
    sold: true,
  },
  {
    id: "10",
    title: "佛林寺 - 骨灰位",
    type: "出售",
    location: "台北市北投區",
    price: "蔡小姐",
    description: "報恩區位置，永久使用權狀，溫泉路150-1號",
    imageUrl: "/listings/S__83640530_0.jpg",
    createdAt: "2026-01-10",
    ownerName: "蔡小姐",
    sold: false,
  },
];

interface ListingsContextType {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  isUsingNeon: boolean;
  addListing: (listing: Omit<Listing, "id" | "createdAt">) => Promise<void>;
  updateListing: (id: string, listing: Partial<Listing>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  toggleSold: (id: string) => Promise<void>;
  resetListings: () => Promise<void>;
  refreshListings: () => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const STORAGE_KEY = "haoxin_listings";

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingNeon] = useState(() => isNeonConfigured());

  // Load listings from localStorage
  const loadFromLocalStorage = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return initialListings;
        }
      }
    }
    return initialListings;
  }, []);

  // Save to localStorage
  const saveToLocalStorage = useCallback((data: Listing[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  // Fetch listings from Neon
  const fetchFromNeon = useCallback(async () => {
    const data = await listingsQuery.getAll();
    return data.map(fromDbListing);
  }, []);

  // Refresh listings
  const refreshListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isUsingNeon) {
        const data = await fetchFromNeon();
        setListings(data);
      } else {
        const data = loadFromLocalStorage();
        setListings(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入資料失敗");
      // Fallback to localStorage on Neon error
      const data = loadFromLocalStorage();
      setListings(data);
    } finally {
      setLoading(false);
    }
  }, [isUsingNeon, fetchFromNeon, loadFromLocalStorage]);

  // Initial load
  useEffect(() => {
    refreshListings();
  }, [refreshListings]);

  // Persist to localStorage when not using Neon
  useEffect(() => {
    if (!isUsingNeon && listings.length > 0) {
      saveToLocalStorage(listings);
    }
  }, [listings, isUsingNeon, saveToLocalStorage]);

  const addListing = async (listing: Omit<Listing, "id" | "createdAt">) => {
    const newListing: Listing = {
      ...listing,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (isUsingNeon) {
      try {
        const dbListing = toDbListing(newListing) as DbListing;
        await listingsQuery.create(dbListing);
        await refreshListings();
      } catch (err) {
        setError(err instanceof Error ? err.message : "新增失敗");
        throw err;
      }
    } else {
      setListings((prev) => [newListing, ...prev]);
    }
  };

  const updateListing = async (id: string, updates: Partial<Listing>) => {
    if (isUsingNeon) {
      try {
        await listingsQuery.update(id, toDbListing(updates));
        await refreshListings();
      } catch (err) {
        setError(err instanceof Error ? err.message : "更新失敗");
        throw err;
      }
    } else {
      setListings((prev) =>
        prev.map((listing) =>
          listing.id === id ? { ...listing, ...updates } : listing
        )
      );
    }
  };

  const deleteListing = async (id: string) => {
    if (isUsingNeon) {
      try {
        await listingsQuery.delete(id);
        await refreshListings();
      } catch (err) {
        setError(err instanceof Error ? err.message : "刪除失敗");
        throw err;
      }
    } else {
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    }
  };

  const toggleSold = async (id: string) => {
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;

    if (isUsingNeon) {
      try {
        await listingsQuery.update(id, { sold: !listing.sold });
        await refreshListings();
      } catch (err) {
        setError(err instanceof Error ? err.message : "更新失敗");
        throw err;
      }
    } else {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, sold: !l.sold } : l))
      );
    }
  };

  const resetListings = async () => {
    if (isUsingNeon) {
      try {
        // Delete all and insert initial
        await listingsQuery.deleteAll();
        for (const listing of initialListings) {
          const dbListing = toDbListing(listing) as DbListing;
          await listingsQuery.create(dbListing);
        }
        await refreshListings();
      } catch (err) {
        setError(err instanceof Error ? err.message : "重置失敗");
        throw err;
      }
    } else {
      setListings(initialListings);
      saveToLocalStorage(initialListings);
    }
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        loading,
        error,
        isUsingNeon,
        addListing,
        updateListing,
        deleteListing,
        toggleSold,
        resetListings,
        refreshListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
}
