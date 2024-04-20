import { Button } from '@/components/ui/button';
import { ButtonLoading } from './button-loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface DropdownMenuRadioMenuProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  label: string;
  buttonLabel: string;
  isLoading?: boolean;
  onHandleChange: (value: string) => void;
  triggerClassName?: string;
}

export function DropdownMenuRadioMenu({
  options,
  selectedValue,
  label,
  buttonLabel,
  isLoading = false,
  onHandleChange,
  triggerClassName = ''
}: DropdownMenuRadioMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={triggerClassName}>
        {isLoading ? (
          <ButtonLoading buttonLabel={buttonLabel} />
        ) : (
          <Button className={triggerClassName}>{buttonLabel}</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedValue} onValueChange={onHandleChange}>
          {options.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
