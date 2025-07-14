// __tests__/integration/ProductListPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import ProductListPage from '@/app/products/page';

test('商品一覧が表示される', async () => {
  render(<ProductListPage />);
  await waitFor(() => {
    expect(screen.getByText('テスト商品')).toBeInTheDocument();
  });
});
