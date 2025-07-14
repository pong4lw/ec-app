import { render, screen } from '@testing-library/react';
import ProductDetailPage from '@/app/products/[id]/page';
import { getProductById } from '@/lib/firestore/products';

jest.mock('@/lib/firestore/products');

const mockProduct = {
  id: 'abc123',
  name: '詳細テスト商品',
  price: 2200,
  imageUrl: 'https://example.com/image.jpg',
  description: 'これは詳細ページのテスト商品です',
};

describe('ProductDetailPage', () => {
  it('詳細情報が正しく表示される', async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    render(await ProductDetailPage({ params: { id: 'abc123' } }));

    expect(screen.getByText('詳細テスト商品')).toBeInTheDocument();
    expect(screen.getByText('¥2,200')).toBeInTheDocument();
    expect(screen.getByText('これは詳細ページのテスト商品です')).toBeInTheDocument();
  });

  it('商品が存在しない場合は404', async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);

    // 404 notFound() を返す場合は render 前に例外を throw するケースが多いので try-catch
    try {
      await ProductDetailPage({ params: { id: 'invalid-id' } });
    } catch (e) {
      expect(e.message).toMatch(/notFound/);
    }
  });
});
