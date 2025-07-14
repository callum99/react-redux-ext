import { Popover } from "radix-ui";

export const PopoverDemo = ({className}: {className?: string}) => (
  <Popover.Root>
    <Popover.Trigger className={className}>Popover Component</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={"font-sans rounded-lg p-[20px] w-[260px] text-primary-50 bg-primary-500"}>
        Some more info…
        <Popover.Arrow  className={"fill-primary-500"}/>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
