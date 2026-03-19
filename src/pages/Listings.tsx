import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Search, Grid3X3, List, RefreshCw, FileText, Settings } from "lucide-react";
import { useListings } from "@/context/ListingsContext";

type FilterType = "全部" | "出售" | "收購";
type ViewType = "grid" | "list";

const Listings = () => {
  const { listings } = useListings();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("全部");
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  // Filter listings based on search query and filter type
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.ownerName.includes(searchQuery);
    const matchesFilter = activeFilter === "全部" || listing.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">返回首頁</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-warm-gold">
                  物件列表
                </h1>
                <p className="text-xs text-muted-foreground">
                  共 {filteredListings.length} 筆資料
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a
                  href="tel:02-22425697"
                  className="flex items-center gap-2 text-muted-foreground hover:text-warm-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  02-22425697
                </a>
                <a
                  href="mailto:sam0292@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-warm-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  sam0292@gmail.com
                </a>
              </div>
              <Link
                to="/admin"
                className="p-2 text-muted-foreground hover:text-warm-gold transition-colors"
                title="管理後台"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-border p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜尋物件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-warm-gold/30 focus:border-warm-gold transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {(["全部", "出售", "收購"] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-warm-gold/15 text-warm-gold border border-warm-gold"
                      : "bg-transparent text-muted-foreground border border-border hover:border-warm-gold/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* View Toggle and Refresh */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1 p-1 bg-secondary/30 rounded-xl border border-border">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewType === "grid"
                      ? "bg-warm-gold/20 text-warm-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewType === "list"
                      ? "bg-warm-gold/20 text-warm-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2.5 bg-secondary/30 border border-border rounded-xl text-muted-foreground hover:text-warm-gold hover:border-warm-gold/50 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Listings Content */}
        {filteredListings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-5 bg-secondary/50 rounded-2xl flex items-center justify-center">
              <FileText className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-foreground text-lg font-medium mb-2">尚無物件資料</p>
            <p className="text-muted-foreground text-sm">請稍後再回來查看</p>
          </div>
        ) : (
          /* Listings Grid/List */
          <div
            className={
              viewType === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className={`bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow relative ${
                  viewType === "list" ? "flex" : ""
                }`}
              >
                {listing.imageUrl && (
                  <div
                    className={`bg-secondary/30 overflow-hidden relative ${
                      viewType === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${
                        listing.sold ? "opacity-70" : ""
                      }`}
                    />
                    {/* Sold Overlay */}
                    {listing.sold && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/listings/Stamp.png"
                          alt="已成交"
                          className="w-32 h-auto opacity-90 transform rotate-[-15deg]"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        listing.sold
                          ? "bg-gray-200 text-gray-500"
                          : listing.type === "出售"
                          ? "bg-warm-gold/15 text-warm-gold"
                          : "bg-blue-500/15 text-blue-600"
                      }`}
                    >
                      {listing.sold ? "已成交" : listing.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{listing.location}</span>
                  </div>
                  <h3 className={`font-medium mb-1 line-clamp-2 ${listing.sold ? "text-muted-foreground" : "text-foreground"}`}>
                    {listing.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{listing.description}</p>
                  <p className={`font-semibold ${listing.sold ? "text-muted-foreground" : "text-warm-gold"}`}>
                    {listing.ownerName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-muted-foreground/50 text-xs mt-12">
          © 2026 壕芯實業（統一編號：61225527）新北市. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default Listings;
