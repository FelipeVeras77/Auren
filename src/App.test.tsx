import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return user;
};

describe('Auren — fluxo de compra', () => {
  it('renderiza a hero com título e CTAs', () => {
    setup();
    expect(screen.getByRole('heading', { level: 1, name: /Prata que acompanha a sua luz/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explorar coleção/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver novidades/ })).toBeInTheDocument();
  });

  it('mostra as 8 peças com nome, material e preço', () => {
    setup();
    const vitrine = screen.getByRole('region', { name: /Peças para colecionar luz/ });
    expect(within(vitrine).getAllByRole('article')).toHaveLength(8);
    expect(within(vitrine).getByText('R$ 189,00', { exact: false })).toBeInTheDocument();
    expect(within(vitrine).getAllByText('Prata 925').length).toBe(8);
  });

  it('filtra por categoria', async () => {
    const user = setup();
    const vitrine = screen.getByRole('region', { name: /Peças para colecionar luz/ });
    await user.click(within(vitrine).getByRole('button', { name: /^Colares/ }));
    const cards = within(vitrine).getAllByRole('article');
    expect(cards).toHaveLength(2);
    expect(within(vitrine).getByRole('button', { name: /^Colares/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('adiciona à sacola, altera quantidade, mostra subtotal e persiste', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Adicionar Anel Eclipse à sacola' }));
    expect(screen.getByText('Anel Eclipse adicionado à sacola.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sacola \(1 item\)/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ver sacola' }));
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Anel Eclipse' }));
    expect(screen.getByTestId('subtotal')).toHaveTextContent('R$ 378,00');
    expect(JSON.parse(localStorage.getItem('auren:cart')!)).toEqual([{ id: 'anel-eclipse', qty: 2 }]);

    const bag = screen.getByRole('dialog', { name: /Sacola/ });
    await user.click(within(bag).getByRole('button', { name: 'Remover Anel Eclipse da sacola' }));
    expect(screen.getByText('Sua sacola está vazia.')).toBeInTheDocument();
  });

  it('favorita e desfavorita um produto', async () => {
    const user = setup();
    const fav = screen.getByRole('button', { name: 'Favoritar Colar Lume' });
    await user.click(fav);
    expect(screen.getByRole('button', { name: 'Remover Colar Lume dos favoritos' })).toHaveAttribute('aria-pressed', 'true');
    expect(JSON.parse(localStorage.getItem('auren:favorites')!)).toEqual(['colar-lume']);
  });

  it('busca produtos e abre o detalhe com quantidade', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Buscar produtos' }));
    const search = screen.getByRole('dialog', { name: 'Buscar' });
    await user.type(within(search).getByRole('searchbox'), 'orbital');
    expect(await within(search).findByText('1 peça encontrada')).toBeInTheDocument();
    await user.click(within(search).getByRole('button', { name: /Brinco Orbital/ }));

    const dialog = screen.getByRole('dialog', { name: 'Brinco Orbital' });
    expect(within(dialog).getByText(/Cuidados com a prata/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Aumentar quantidade de Brinco Orbital' }));
    await user.click(within(dialog).getByRole('button', { name: /Adicionar à sacola/ }));
    expect(screen.getByRole('button', { name: /Sacola \(2 itens\)/ })).toBeInTheDocument();
  });

  it('valida o e-mail da newsletter com feedback acessível', async () => {
    const user = setup();
    const input = screen.getByLabelText('Seu e-mail');
    await user.click(screen.getByRole('button', { name: 'Assinar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Informe seu e-mail');
    expect(input).toHaveAttribute('aria-invalid', 'true');

    await user.type(input, 'nome@');
    await user.click(screen.getByRole('button', { name: 'Assinar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('e-mail válido');

    await user.clear(input);
    await user.type(input, 'ana@exemplo.com');
    await user.click(screen.getByRole('button', { name: 'Assinar' }));
    expect(screen.getByText(/chegarão em ana@exemplo.com/)).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
