import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@pages/content/ui/app';

describe('appTest', () => {
  test.skip('render text', () => {
    // given
    const text = ''; // content returns null fow now.

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
