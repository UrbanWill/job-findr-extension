import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface ButtonLoadingProps {
  buttonLabel: string;
  className?: string;
}

export function ButtonLoading({ buttonLabel, className }: ButtonLoadingProps) {
  return (
    <Button disabled className={className}>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {buttonLabel}
    </Button>
  );
}
