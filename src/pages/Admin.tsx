import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  RotateCcw,
  LayoutGrid,
  ExternalLink,
  ChevronRight,
  MapPin,
  CheckCircle2,
  XCircle,
  Database,
  HardDrive,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useListings, type Listing } from "@/context/ListingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";

const ADMIN_PASSWORD = "haoxin2026";

interface ListingFormData {
  title: string;
  type: "出售" | "收購";
  location: string;
  ownerName: string;
  description: string;
  imageUrl: string;
}

const emptyFormData: ListingFormData = {
  title: "",
  type: "出售",
  location: "",
  ownerName: "",
  description: "",
  imageUrl: "",
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<ListingFormData>(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { listings, loading, error, isUsingNeon, addListing, updateListing, deleteListing, toggleSold, resetListings, refreshListings } =
    useListings();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("密碼錯誤，請重試");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addListing({
        ...formData,
        price: formData.ownerName,
        sold: false,
      });
      setFormData(emptyFormData);
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error("新增失敗:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingListing) {
      setIsSubmitting(true);
      try {
        await updateListing(editingListing.id, {
          ...formData,
          price: formData.ownerName,
        });
        setEditingListing(null);
        setFormData(emptyFormData);
      } catch (err) {
        console.error("編輯失敗:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const openEditDialog = (listing: Listing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      type: listing.type,
      location: listing.location,
      ownerName: listing.ownerName,
      description: listing.description,
      imageUrl: listing.imageUrl || "",
    });
  };

  const soldCount = listings.filter((l) => l.sold).length;
  const activeCount = listings.filter((l) => !l.sold).length;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-44 h-44 mx-auto mb-4">
                <img
                  src="https://ugc.same-assets.com/KYQTkxTi2KqviQGNFjqYVyGP4Q1fHUiI.png"
                  alt="壕芯實業"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                管理後台
              </h1>
              <p className="text-muted-foreground text-sm">請輸入管理員密碼</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12 rounded-xl text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-sm text-red-500 text-center">{passwordError}</p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl text-base font-medium"
              >
                登入
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-warm-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render form fields (not a component, just JSX)
  const renderFormFields = (isEdit: boolean) => (
    <>
      <div>
        <Label htmlFor={isEdit ? "edit-title" : "title"} className="text-sm font-medium">
          物件名稱
        </Label>
        <Input
          id={isEdit ? "edit-title" : "title"}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="例：國寶中投福座"
          className="h-11 mt-1.5 rounded-xl"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">類型</Label>
          <Select
            value={formData.type}
            onValueChange={(value: "出售" | "收購") =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger className="h-11 mt-1.5 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="出售">出售</SelectItem>
              <SelectItem value="收購">收購</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium">地點</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="新北市"
            className="h-11 mt-1.5 rounded-xl"
            required
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">委託人</Label>
        <Input
          value={formData.ownerName}
          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          placeholder="李先生"
          className="h-11 mt-1.5 rounded-xl"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium">描述</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="物件詳細描述..."
          className="mt-1.5 rounded-xl min-h-[80px]"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">圖片</Label>
        <div className="mt-1.5">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(value) => setFormData({ ...formData, imageUrl: value })}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          拖曳上傳圖片，或輸入網址：
        </p>
        <Input
          value={formData.imageUrl.startsWith("data:") ? "" : formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="/listings/image.jpg"
          className="h-10 mt-1 rounded-xl text-xs"
        />
      </div>
    </>
  );

  // Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl font-heading font-bold text-warm-gold">
                  管理後台
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  物件管理系統
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Database Status */}
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                isUsingNeon
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {isUsingNeon ? (
                  <>
                    <Database className="w-3.5 h-3.5" />
                    <span>Neon</span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>本地儲存</span>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refreshListings()}
                disabled={loading}
                className="w-10 h-10 rounded-xl"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Link to="/listings">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl text-muted-foreground hover:text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <p className="font-medium">發生錯誤</p>
            <p>{error}</p>
          </div>
        )}

        {/* Mobile Database Status */}
        <div className={`sm:hidden flex items-center justify-center gap-2 mb-4 px-3 py-2 rounded-xl text-xs font-medium ${
          isUsingNeon
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}>
          {isUsingNeon ? (
            <>
              <Database className="w-3.5 h-3.5" />
              <span>已連接 Neon 資料庫</span>
            </>
          ) : (
            <>
              <HardDrive className="w-3.5 h-3.5" />
              <span>使用本地儲存（瀏覽器）</span>
            </>
          )}
        </div>

        {/* Stats Cards - Horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible scrollbar-hide">
          <div className="flex-shrink-0 w-[140px] sm:w-auto bg-white rounded-2xl border border-border p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">總物件</span>
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {listings.length}
            </p>
          </div>
          <div className="flex-shrink-0 w-[140px] sm:w-auto bg-white rounded-2xl border border-border p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-warm-gold" />
              <span className="text-xs text-muted-foreground">進行中</span>
            </div>
            <p className="text-3xl font-heading font-bold text-warm-gold">
              {activeCount}
            </p>
          </div>
          <div className="flex-shrink-0 w-[140px] sm:w-auto bg-white rounded-2xl border border-border p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">已成交</span>
            </div>
            <p className="text-3xl font-heading font-bold text-green-600">
              {soldCount}
            </p>
          </div>
        </div>

        {/* Desktop Action Bar */}
        <div className="hidden sm:flex gap-3 mt-6 mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                新增物件
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>新增物件</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                {renderFormFields(false)}
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                    取消
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "新增"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="rounded-xl text-muted-foreground">
                <RotateCcw className="w-4 h-4 mr-2" />
                重置資料
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>確定要重置所有資料？</AlertDialogTitle>
                <AlertDialogDescription>
                  這將會還原所有物件到初始狀態，此操作無法復原。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetListings}
                  className="bg-red-500 hover:bg-red-600 rounded-xl"
                >
                  確定重置
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Listings - Cards on mobile, Table on desktop */}
        <div className="mt-6 sm:mt-0">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-warm-gold" />
              <span className="ml-2 text-muted-foreground">載入中...</span>
            </div>
          )}

          {/* Mobile Card View */}
          {!loading && <div className="space-y-3 sm:hidden">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className={`bg-white rounded-2xl border border-border overflow-hidden shadow-sm transition-all ${
                  listing.sold ? "opacity-75" : ""
                }`}
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-secondary/30">
                    {listing.imageUrl ? (
                      <img
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-3 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              listing.sold
                                ? "bg-green-100 text-green-600"
                                : listing.type === "出售"
                                ? "bg-warm-gold/15 text-warm-gold"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {listing.sold ? "已成交" : listing.type}
                          </span>
                        </div>
                        <h3 className="font-medium text-sm text-foreground line-clamp-1">
                          {listing.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {listing.location}
                          </span>
                          <span className="text-xs text-warm-gold font-medium ml-2">
                            {listing.ownerName}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between px-3 py-2.5 bg-secondary/30 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">已成交</span>
                    <Switch
                      checked={listing.sold}
                      onCheckedChange={() => toggleSold(listing.id)}
                      className="data-[state=checked]:bg-green-500 scale-90"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Edit */}
                    <Dialog
                      open={editingListing?.id === listing.id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingListing(null);
                          setFormData(emptyFormData);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => openEditDialog(listing)}
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md rounded-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>編輯物件</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          {renderFormFields(true)}
                          <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => { setEditingListing(null); setFormData(emptyFormData); }} disabled={isSubmitting}>
                              取消
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 h-11 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "儲存"}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl mx-4">
                        <AlertDialogHeader>
                          <AlertDialogTitle>確定要刪除？</AlertDialogTitle>
                          <AlertDialogDescription>
                            即將刪除「{listing.title}」
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteListing(listing.id)}
                            className="bg-red-500 hover:bg-red-600 rounded-xl"
                          >
                            刪除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {/* Desktop Table View */}
          {!loading && <div className="hidden sm:block bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      物件
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      類型
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      委託人
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      地點
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      狀態
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {listings.map((listing) => (
                    <tr
                      key={listing.id}
                      className={`hover:bg-secondary/20 transition-colors ${
                        listing.sold ? "bg-secondary/10" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {listing.imageUrl ? (
                            <img
                              src={listing.imageUrl}
                              alt={listing.title}
                              className="w-12 h-12 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-secondary rounded-xl" />
                          )}
                          <div className="min-w-0">
                            <p className={`font-medium text-sm truncate max-w-[200px] ${
                              listing.sold ? "text-muted-foreground" : "text-foreground"
                            }`}>
                              {listing.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {listing.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            listing.type === "出售"
                              ? "bg-warm-gold/15 text-warm-gold"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {listing.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-warm-gold font-medium">
                          {listing.ownerName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {listing.location}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <Switch
                            checked={listing.sold}
                            onCheckedChange={() => toggleSold(listing.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <Dialog
                            open={editingListing?.id === listing.id}
                            onOpenChange={(open) => {
                              if (!open) {
                                setEditingListing(null);
                                setFormData(emptyFormData);
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-xl"
                                onClick={() => openEditDialog(listing)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>編輯物件</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                {renderFormFields(true)}
                                <div className="flex gap-3 pt-2">
                                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => { setEditingListing(null); setFormData(emptyFormData); }} disabled={isSubmitting}>
                                    取消
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="flex-1 h-11 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl"
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "儲存"}
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-xl text-muted-foreground hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>確定要刪除此物件？</AlertDialogTitle>
                                <AlertDialogDescription>
                                  即將刪除「{listing.title}」，此操作無法復原。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">取消</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteListing(listing.id)}
                                  className="bg-red-500 hover:bg-red-600 rounded-xl"
                                >
                                  確定刪除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {listings.length === 0 && (
              <div className="text-center py-16">
                <LayoutGrid className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">尚無物件資料</p>
              </div>
            )}
          </div>}

          {/* Empty state for mobile */}
          {listings.length === 0 && (
            <div className="sm:hidden text-center py-16">
              <LayoutGrid className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">尚無物件資料</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-background/80 backdrop-blur-xl border-t border-border/50 px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-between gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle>確定要重置所有資料？</AlertDialogTitle>
                <AlertDialogDescription>
                  這將會還原所有物件到初始狀態。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetListings}
                  className="bg-red-500 hover:bg-red-600 rounded-xl"
                >
                  確定重置
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 h-12 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                新增物件
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>新增物件</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                {renderFormFields(false)}
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                    取消
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 bg-warm-gold hover:bg-warm-gold/90 text-white rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "新增"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Admin;
