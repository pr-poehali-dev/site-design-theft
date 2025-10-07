import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  platform?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'subscriptions', name: 'Подписки', icon: 'CreditCard' },
    { id: 'giftcards', name: 'Подарочные карты', icon: 'Gift' },
    { id: 'software', name: 'Софт', icon: 'Download' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Cyberpunk 2077',
      category: 'games',
      price: 2499,
      image: '/placeholder.svg',
      description: 'Ключ для активации',
      platform: 'Steam'
    },
    {
      id: 2,
      name: 'Xbox Game Pass',
      category: 'subscriptions',
      price: 699,
      image: '/placeholder.svg',
      description: '1 месяц подписки',
      platform: 'Xbox'
    },
    {
      id: 3,
      name: 'PlayStation Store',
      category: 'giftcards',
      price: 1000,
      image: '/placeholder.svg',
      description: 'Подарочная карта 1000₽',
      platform: 'PS5'
    },
    {
      id: 4,
      name: 'Spotify Premium',
      category: 'subscriptions',
      price: 169,
      image: '/placeholder.svg',
      description: '1 месяц подписки',
      platform: 'Spotify'
    },
    {
      id: 5,
      name: 'Red Dead Redemption 2',
      category: 'games',
      price: 1999,
      image: '/placeholder.svg',
      description: 'Ключ для активации',
      platform: 'Steam'
    },
    {
      id: 6,
      name: 'Netflix Premium',
      category: 'subscriptions',
      price: 799,
      image: '/placeholder.svg',
      description: '1 месяц подписки',
      platform: 'Netflix'
    },
    {
      id: 7,
      name: 'Steam Wallet',
      category: 'giftcards',
      price: 500,
      image: '/placeholder.svg',
      description: 'Подарочная карта 500₽',
      platform: 'Steam'
    },
    {
      id: 8,
      name: 'Microsoft Office 365',
      category: 'software',
      price: 4999,
      image: '/placeholder.svg',
      description: 'Годовая лицензия',
      platform: 'Windows'
    }
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
      title: "Товар добавлен в корзину",
      description: product.name
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]">
      <header className="sticky top-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white font-heading">DIGITAL STORE</h1>
            </div>

            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Icon name="User" size={20} />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative text-white hover:bg-white/10">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg bg-[#1A1A2E] border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white font-heading">Корзина</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.id} className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Icon name="Package" size={32} className="text-gray-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-6 w-6 p-0 text-white hover:bg-white/10"
                                          onClick={() => updateQuantity(item.id, -1)}
                                        >
                                          <Icon name="Minus" size={14} />
                                        </Button>
                                        <span className="text-white w-8 text-center">{item.quantity}</span>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-6 w-6 p-0 text-white hover:bg-white/10"
                                          onClick={() => updateQuantity(item.id, 1)}
                                        >
                                          <Icon name="Plus" size={14} />
                                        </Button>
                                      </div>
                                      <p className="font-bold text-primary">{item.price * item.quantity}₽</p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={18} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Итого:</span>
                            <span className="text-2xl font-bold text-white">{getTotalPrice()}₽</span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold">
                            Оформить заказ
                            <Icon name="ArrowRight" size={18} className="ml-2" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-0 hover:opacity-90"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }
              >
                <Icon name={category.icon as any} size={18} className="mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in group overflow-hidden backdrop-blur-sm"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="p-0">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <Icon name="Package" size={64} className="text-white/20 group-hover:scale-110 transition-transform duration-300" />
                  {product.platform && (
                    <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
                      {product.platform}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg text-white font-heading mb-2 line-clamp-1">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white font-semibold"
                  onClick={() => addToCart(product)}
                >
                  Купить
                  <Icon name="ShoppingCart" size={18} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Search" size={64} className="mx-auto mb-4 text-gray-600" />
            <p className="text-xl text-gray-400">Товары не найдены</p>
          </div>
        )}
      </div>

      <footer className="bg-[#0F0F1E] border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-heading font-bold mb-4">DIGITAL STORE</h3>
              <p className="text-gray-400 text-sm">Магазин цифровых товаров. Игры, подписки, софт.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Игры</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Подписки</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Подарочные карты</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Программы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Возврат</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <div className="flex gap-3">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-white/10">
                  <Icon name="Mail" size={18} />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-white/10">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-white/10">
                  <Icon name="Phone" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Digital Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
