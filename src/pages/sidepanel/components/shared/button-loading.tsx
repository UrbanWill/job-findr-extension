import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface ButtonLoadingProps {
  buttonLabel: string;
}

export function ButtonLoading({ buttonLabel }: ButtonLoadingProps) {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {buttonLabel}
    </Button>
  );
}
