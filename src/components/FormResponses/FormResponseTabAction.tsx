import { useFormResponseContext } from "@/contexts/FormResponse/FormResponseProvider";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import FormResponseHandlers from "./FormResponseHandlers";

interface FormResponseTabActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tab: React.Key;
  setTab: React.Dispatch<React.SetStateAction<React.Key>>;
}

const FormResponseTabAction: React.FC<FormResponseTabActionProps> = ({
  tab,
  children,
  setTab,
}) => {
  const { isSuccess } = useFormResponseContext();

  return (
    <div>
      <Tabs
        disabledKeys={tab === "viewer" ? ["handler"] : ["viewer"]}
        selectedKey={tab}
        onSelectionChange={setTab}
        aria-label="Tab form responses actions"
        fullWidth
      >
        <Tab key="viewer" title="Người Xem" />
        <Tab key="handler" title="Người Xử Lý" />
      </Tabs>
      <div className="pt-4">{children}</div>

      <div className="pt-4">
        {tab === "handler" && isSuccess && <FormResponseHandlers />}
      </div>
    </div>
  );
};

export default FormResponseTabAction;
