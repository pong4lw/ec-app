import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from '@/lib/firestore/cart';

describe('useCartStore', () => {
  beforeEach(() => {
    // ストアのリセット（必要なら）
    useCartStore.setState({ items: [] });
  });

  test('カートに商品を追加できる', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart({ id: '1', name: '商品A', price: 1000 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      id: '1',
      name: '商品A',
      price: 1000,
      quantity: 1,
    });
  });

  test('既存商品は数量が増える', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart({ id: '1', name: '商品A', price: 1000 });
      result.current.addToCart({ id: '1', name: '商品A', price: 1000 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  test('数量を更新できる', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart({ id: '1', name: '商品A', price: 1000 });
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  test('商品を削除できる', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addToCart({ id: '1', name: '商品A', price: 1000 });
      result.current.removeFromCart('1');
    });

    expect(result.current.items).toHaveLength(0);
  });
});
