import { Tooltip } from "radix-ui";
import { RocketIcon } from "@radix-ui/react-icons";

export const Tooltiper = ({className}: {className?: string}) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="rounded-lg bg-secondary-600 text-secondary-50 p-[5px] h-[40px] w-[100px] flex justify-center items-center">
          <RocketIcon/>&nbsp;Tooltip
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={className} sideOffset={5}>
          Tooltip content!
          <Tooltip.Arrow className={"fill-primary-900" } />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);
