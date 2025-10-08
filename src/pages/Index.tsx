import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  platform: string;
  badges: string[];
  rating: number;
  reviews: number;
  deliveryTime: string;
  region: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const platforms = [
    { id: 'all', name: 'Все платформы', icon: 'Grid3x3' },
    { id: 'steam', name: 'Steam', icon: 'Gamepad2' },
    { id: 'playstation', name: 'PlayStation', icon: 'Gamepad' },
    { id: 'xbox', name: 'Xbox', icon: 'Box' },
    { id: 'nintendo', name: 'Nintendo', icon: 'Radio' },
    { id: 'epicgames', name: 'Epic Games', icon: 'Trophy' },
    { id: 'battlenet', name: 'Battle.net', icon: 'Swords' },
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'LayoutGrid' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'topups', name: 'Пополнения', icon: 'Wallet' },
    { id: 'subscriptions', name: 'Подписки', icon: 'CreditCard' },
    { id: 'giftcards', name: 'Подарочные карты', icon: 'Gift' },
    { id: 'dlc', name: 'DLC', icon: 'PackagePlus' },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Cyberpunk 2077',
      category: 'games',
      price: 2499,
      originalPrice: 3999,
      image: '/placeholder.svg',
      description: 'Ключ для активации в Steam. Мгновенная доставка на почту.',
      platform: 'steam',
      badges: ['popular', 'discount'],
      rating: 4.8,
      reviews: 1523,
      deliveryTime: 'Мгновенно',
      region: 'RU/CIS'
    },
    {
      id: 2,
      name: 'Xbox Game Pass Ultimate',
      category: 'subscriptions',
      price: 699,
      image: '/placeholder.svg',
      description: '1 месяц подписки Xbox Game Pass Ultimate',
      platform: 'xbox',
      badges: ['popular', 'new'],
      rating: 4.9,
      reviews: 2341,
      deliveryTime: 'До 5 минут',
      region: 'Россия'
    },
    {
      id: 3,
      name: 'PlayStation Store 1000₽',
      category: 'giftcards',
      price: 1050,
      image: '/placeholder.svg',
      description: 'Подарочная карта PlayStation Store номиналом 1000₽',
      platform: 'playstation',
      badges: ['commission-free'],
      rating: 4.7,
      reviews: 892,
      deliveryTime: 'Мгновенно',
      region: 'RU'
    },
    {
      id: 4,
      name: 'Spotify Premium',
      category: 'subscriptions',
      price: 169,
      image: '/placeholder.svg',
      description: '1 месяц подписки Spotify Premium',
      platform: 'steam',
      badges: ['popular'],
      rating: 4.6,
      reviews: 1234,
      deliveryTime: 'Мгновенно',
      region: 'Россия'
    },
    {
      id: 5,
      name: 'Red Dead Redemption 2',
      category: 'games',
      price: 1999,
      originalPrice: 2999,
      image: '/placeholder.svg',
      description: 'Ключ активации для Steam',
      platform: 'steam',
      badges: ['discount'],
      rating: 4.9,
      reviews: 3421,
      deliveryTime: 'Мгновенно',
      region: 'RU/CIS'
    },
    {
      id: 6,
      name: 'Netflix Premium',
      category: 'subscriptions',
      price: 799,
      image: '/placeholder.svg',
      description: '1 месяц подписки Netflix Premium',
      platform: 'steam',
      badges: ['new'],
      rating: 4.5,
      reviews: 567,
      deliveryTime: 'До 10 минут',
      region: 'Россия'
    },
    {
      id: 7,
      name: 'Steam Wallet 500₽',
      category: 'topups',
      price: 500,
      image: '/placeholder.svg',
      description: 'Пополнение кошелька Steam на 500 рублей',
      platform: 'steam',
      badges: ['commission-free', 'popular'],
      rating: 5.0,
      reviews: 4521,
      deliveryTime: 'Мгновенно',
      region: 'RU'
    },
    {
      id: 8,
      name: 'Elden Ring',
      category: 'games',
      price: 2799,
      originalPrice: 3499,
      image: '/placeholder.svg',
      description: 'Ключ активации Steam',
      platform: 'steam',
      badges: ['discount', 'popular'],
      rating: 4.9,
      reviews: 2891,
      deliveryTime: 'Мгновенно',
      region: 'RU/CIS'
    },
    {
      id: 9,
      name: 'Genshin Impact Crystal',
      category: 'topups',
      price: 1299,
      image: '/placeholder.svg',
      description: 'Пополнение 1980 кристаллов Genshin Impact',
      platform: 'epicgames',
      badges: ['popular'],
      rating: 4.8,
      reviews: 1823,
      deliveryTime: 'До 5 минут',
      region: 'Все регионы'
    },
    {
      id: 10,
      name: 'Baldurs Gate 3',
      category: 'games',
      price: 3299,
      image: '/placeholder.svg',
      description: 'Ключ активации для Steam',
      platform: 'steam',
      badges: ['new', 'popular'],
      rating: 5.0,
      reviews: 4231,
      deliveryTime: 'Мгновенно',
      region: 'RU/CIS'
    },
    {
      id: 11,
      name: 'Hogwarts Legacy',
      category: 'games',
      price: 2899,
      originalPrice: 3999,
      image: '/placeholder.svg',
      description: 'Ключ для Steam',
      platform: 'steam',
      badges: ['discount'],
      rating: 4.7,
      reviews: 1923,
      deliveryTime: 'Мгновенно',
      region: 'RU/CIS'
    },
    {
      id: 12,
      name: 'Nintendo eShop 1000₽',
      category: 'giftcards',
      price: 1100,
      image: '/placeholder.svg',
      description: 'Подарочная карта Nintendo eShop',
      platform: 'nintendo',
      badges: ['commission-free'],
      rating: 4.6,
      reviews: 723,
      deliveryTime: 'Мгновенно',
      region: 'RU'
    },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast({
      title: "✓ Товар добавлен в корзину",
      description: product.name,
      duration: 2000,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast({
      title: "Товар удален из корзины",
      duration: 2000,
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      toast({
        title: "Промокод применен!",
        description: `Скидка 10% по промокоду "${promoCode}"`,
        duration: 3000,
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || product.platform === selectedPlatform;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPlatform && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.reviews - a.reviews;
    }
  });

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'popular':
        return 'bg-yellow-500 text-black';
      case 'new':
        return 'bg-green-500 text-white';
      case 'discount':
        return 'bg-red-500 text-white';
      case 'commission-free':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'popular':
        return 'Популярное';
      case 'new':
        return 'Новое';
      case 'discount':
        return 'Скидка';
      case 'commission-free':
        return '0% комиссия';
      default:
        return badge;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0F]/98 backdrop-blur-lg shadow-lg shadow-purple-500/5' : 'bg-[#0A0A0F]'} border-b border-white/5`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 group" onClick={() => { setSelectedCategory('all'); setSelectedPlatform('all'); }}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/50">
                  <Icon name="ShoppingBag" size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight hidden sm:block">KUPIKOD</h1>
              </button>

              <nav className="hidden lg:flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">
                      Платформы
                      <Icon name="ChevronDown" size={16} className="ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1A1A24] border-white/10 animate-in fade-in-0 zoom-in-95">
                    {platforms.slice(1).map(platform => (
                      <DropdownMenuItem
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-150"
                      >
                        <Icon name={platform.icon as any} size={16} className="mr-2" />
                        {platform.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => setSelectedCategory('games')}
                >
                  Игры
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => setSelectedCategory('topups')}
                >
                  Пополнения
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => setSelectedCategory('subscriptions')}
                >
                  Подписки
                </Button>
              </nav>
            </div>

            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative group">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400" />
                <Input
                  type="text"
                  placeholder="Поиск игр, подписок..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/5 hidden sm:flex transition-all duration-200"
                onClick={() => setShowAuthModal(true)}
              >
                <Icon name="User" size={20} />
                <span className="ml-2 hidden lg:inline">Войти</span>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-white text-xs border-0 animate-scale-in shadow-lg shadow-purple-500/50">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg bg-[#0A0A0F] border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white text-xl">Корзина</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-20 animate-fade-in">
                        <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-gray-400 text-lg">Корзина пуста</p>
                        <p className="text-gray-600 text-sm mt-2">Добавьте товары для оформления заказа</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                          {cart.map((item, index) => (
                            <Card key={item.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                                    <Icon name="Package" size={28} className="text-purple-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-sm truncate">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.platform.toUpperCase()}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 text-white hover:bg-white/10 transition-colors"
                                          onClick={() => updateQuantity(item.id, -1)}
                                        >
                                          <Icon name="Minus" size={12} />
                                        </Button>
                                        <span className="text-white text-sm w-6 text-center font-semibold">{item.quantity}</span>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 text-white hover:bg-white/10 transition-colors"
                                          onClick={() => updateQuantity(item.id, 1)}
                                        >
                                          <Icon name="Plus" size={12} />
                                        </Button>
                                      </div>
                                      <p className="font-bold text-purple-400 text-sm">{item.price * item.quantity}₽</p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0 transition-all duration-200"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Промокод"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 transition-all duration-200 focus:border-purple-500/50"
                            />
                            <Button
                              onClick={applyPromoCode}
                              className="bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                            >
                              Применить
                            </Button>
                          </div>

                          <div className="flex justify-between items-center py-3">
                            <span className="text-gray-400">Итого:</span>
                            <span className="text-3xl font-bold text-white">{getTotalPrice()}₽</span>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold h-12 text-base transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
                            Оформить заказ
                            <Icon name="ArrowRight" size={18} className="ml-2" />
                          </Button>
                          
                          <p className="text-xs text-center text-gray-500">
                            <Icon name="Zap" size={12} className="inline mr-1 text-yellow-500" />
                            Доставка мгновенно на email
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                className="lg:hidden text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 py-4 space-y-2 animate-fade-in">
              <div className="relative mb-3">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 transition-all duration-200"
                />
              </div>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon name={cat.icon as any} size={18} className="mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 border-b border-white/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Экосистема для геймеров
            </h2>
            <p className="text-xl text-gray-400 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Огромный ассортимент, низкие цены, поддержка 24/7
            </p>
            <div className="flex flex-wrap gap-6 text-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
              <button className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <Icon name="Zap" size={18} className="text-yellow-500" />
                <span className="text-gray-300">Мгновенная доставка</span>
              </button>
              <button className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <Icon name="Shield" size={18} className="text-green-500" />
                <span className="text-gray-300">Гарантия качества</span>
              </button>
              <button className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <Icon name="Headphones" size={18} className="text-blue-500" />
                <span className="text-gray-300">Поддержка 24/7</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <Button
                  key={platform.id}
                  size="sm"
                  variant={selectedPlatform === platform.id ? "default" : "outline"}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={
                    selectedPlatform === platform.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/30"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all duration-200"
                  }
                >
                  <Icon name={platform.icon as any} size={16} className="mr-2" />
                  {platform.name}
                </Button>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-200">
                  <Icon name="ArrowUpDown" size={16} className="mr-2" />
                  Сортировка
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1A1A24] border-white/10 animate-in fade-in-0 zoom-in-95">
                <DropdownMenuItem onClick={() => setSortBy('popular')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                  По популярности
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                  Цена: по возрастанию
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                  Цена: по убыванию
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                  По рейтингу
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('newest')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                  Сначала новые
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                size="sm"
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
                    : "text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                }
              >
                <Icon name={category.icon as any} size={14} className="mr-1.5" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((product, index) => (
            <Card
              key={product.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group overflow-hidden animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center overflow-hidden">
                  <Icon name="Package" size={48} className="text-white/10 group-hover:scale-125 transition-all duration-700 ease-out" />
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.badges.map(badge => (
                      <Badge key={badge} className={`${getBadgeStyle(badge)} text-xs px-2 py-0.5 font-semibold border-0 shadow-lg`}>
                        {getBadgeText(badge)}
                      </Badge>
                    ))}
                  </div>

                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/60 text-white text-xs border-0 backdrop-blur-sm">
                      {product.platform.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                      <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-white text-xs font-semibold">{product.rating}</span>
                      <span className="text-gray-400 text-xs">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-white text-base line-clamp-1 group-hover:text-purple-400 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Icon name="Clock" size={12} />
                    <span>{product.deliveryTime}</span>
                    <span className="text-gray-700">•</span>
                    <Icon name="MapPin" size={12} />
                    <span>{product.region}</span>
                  </div>

                  <div className="flex items-end justify-between pt-2 border-t border-white/5">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{product.price}₽</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-600 line-through">{product.originalPrice}₽</span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-xs text-green-500 font-semibold">
                          Скидка {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 h-9 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                    >
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Купить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Search" size={64} className="mx-auto mb-4 text-gray-700" />
            <p className="text-xl text-gray-400">Товары не найдены</p>
            <p className="text-gray-600 mt-2">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-[#1A1A24] border-white/10 text-white max-w-2xl animate-in fade-in-0 zoom-in-95">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg flex items-center justify-center group">
                  <Icon name="Package" size={80} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Платформа</p>
                    <p className="text-white font-semibold">{selectedProduct.platform.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Доставка</p>
                    <p className="text-white font-semibold">{selectedProduct.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Регион</p>
                    <p className="text-white font-semibold">{selectedProduct.region}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Рейтинг</p>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-semibold">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} отзывов)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{selectedProduct.price}₽</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-gray-600 line-through">{selectedProduct.originalPrice}₽</span>
                      )}
                    </div>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-green-500 font-semibold">
                        Скидка {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white h-12 px-8 transition-all duration-300 shadow-lg shadow-purple-500/30"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="bg-[#1A1A24] border-white/10 text-white animate-in fade-in-0 zoom-in-95">
          <DialogHeader>
            <DialogTitle className="text-2xl">Вход в аккаунт</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="login" className="data-[state=active]:bg-purple-600 transition-all duration-200">
                Войти
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-purple-600 transition-all duration-200">
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 animate-fade-in">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/5 border-white/10 text-white transition-all duration-200 focus:border-purple-500/50"
              />
              <Input
                type="password"
                placeholder="Пароль"
                className="bg-white/5 border-white/10 text-white transition-all duration-200 focus:border-purple-500/50"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/30">
                Войти
              </Button>
            </TabsContent>
            <TabsContent value="register" className="space-y-4 animate-fade-in">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/5 border-white/10 text-white transition-all duration-200 focus:border-purple-500/50"
              />
              <Input
                type="password"
                placeholder="Пароль"
                className="bg-white/5 border-white/10 text-white transition-all duration-200 focus:border-purple-500/50"
              />
              <Input
                type="password"
                placeholder="Повторите пароль"
                className="bg-white/5 border-white/10 text-white transition-all duration-200 focus:border-purple-500/50"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/30">
                Зарегистрироваться
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <footer className="bg-[#050508] border-t border-white/5 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <button className="flex items-center gap-2 mb-4 group" onClick={() => { setSelectedCategory('all'); setSelectedPlatform('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Icon name="ShoppingBag" size={18} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">KUPIKOD</h3>
              </button>
              <p className="text-gray-500 text-sm leading-relaxed">
                Экосистема для геймеров. Огромный ассортимент цифровых товаров по низким ценам.
              </p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" variant="ghost" className="text-gray-500 hover:text-purple-400 hover:bg-white/5 h-9 w-9 p-0 transition-all duration-200">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-500 hover:text-purple-400 hover:bg-white/5 h-9 w-9 p-0 transition-all duration-200">
                  <Icon name="Mail" size={18} />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => { setSelectedCategory('games'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Игры</button></li>
                <li><button onClick={() => { setSelectedCategory('topups'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Пополнения</button></li>
                <li><button onClick={() => { setSelectedCategory('subscriptions'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Подписки</button></li>
                <li><button onClick={() => { setSelectedCategory('giftcards'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Подарочные карты</button></li>
                <li><button onClick={() => { setSelectedCategory('dlc'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="text-gray-500 hover:text-purple-400 transition-colors duration-200">DLC</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">FAQ</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Как купить</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Доставка</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Возврат</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Контакты</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">О компании</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Партнерам</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Пользовательское соглашение</button></li>
                <li><button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">Политика конфиденциальности</button></li>
              </ul>
              <div className="mt-6">
                <p className="text-gray-500 text-sm mb-2">Поддержка 24/7</p>
                <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors duration-200">
                  support@kupikod.com
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2024 KUPIKOD. Все права защищены.</p>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gray-700 text-gray-500 text-xs hover:border-purple-500/50 transition-colors duration-200">
                <Icon name="Shield" size={12} className="mr-1" />
                Безопасные платежи
              </Badge>
              <Badge variant="outline" className="border-gray-700 text-gray-500 text-xs hover:border-purple-500/50 transition-colors duration-200">
                <Icon name="Zap" size={12} className="mr-1" />
                Мгновенная доставка
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
