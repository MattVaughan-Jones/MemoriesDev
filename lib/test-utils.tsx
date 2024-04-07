import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type RenderOptionsWithProvider = Omit<RenderOptions, 'wrapper'> & {};

const customRender = (ui: ReactElement, options?: RenderOptionsWithProvider) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return { user: userEvent.setup(), ...render(ui, { wrapper, ...options }) };
};

export * from '@testing-library/react';
export { customRender as render };
