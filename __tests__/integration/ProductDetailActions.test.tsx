import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetailActions from '@/components/ProductDetailActions';
import { useCartStore } from '@/lib/firestore/cart';

// Zustandの状態をリセットするヘルパー
beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('ProductDetailActions', () => {
  const product = {
    id: 'p1',
    name: 'テスト商品',
    price: 2000,
    imageUrl: 'https://example.com/image.png',
  };

  test('追加ボタンでカートに追加される', () => {
    render(<ProductDetailActions {...product} />);

    const addButton = screen.getByText('＋追加');
    fireEvent.click(addButton);

    const quantityText = screen.getByText(/数量: 1/);
    expect(quantityText).toBeInTheDocument();
  });

  test('削除ボタンで数量が減る・0で削除される', () => {
    // 事前に数量1で追加しておく
    useCartStore.setState({
      items: [{ ...product, quantity: 1 }],
    });

    render(<ProductDetailActions {...product} />);

    const removeButton = screen.getByText('−削除');
    fireEvent.click(removeButton);

    // 数量0で削除されるため、「数量: 0」は表示されないはず
    expect(screen.queryByText(/数量:/)).toBeNull();
  });

  test('削除ボタンは数量0の時はdisabled', () => {
    render(<ProductDetailActions {...product} />);

    const removeButton = screen.getByText('−削除');
    expect(removeButton).toBeDisabled();
  });
});
