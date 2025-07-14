import { Toast } from "radix-ui";

export const Toastr = ({className}: {className?: string}) => (
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.Action  altText={"TEST"}/>
      <Toast.Close />
    </Toast.Root>
    
    <Toast.Viewport />
  </Toast.Provider>
);
