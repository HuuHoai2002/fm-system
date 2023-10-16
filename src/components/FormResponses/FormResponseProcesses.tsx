import { useAuthStore } from "@/stores/use-auth-store";
import { IResponseProcess } from "@/types/all";
import FormResponseProcessCard from "./FormResponseProcessCard";

interface FormReponseProcessesProps {
  processes: IResponseProcess[];
}

const FormReponseProcesses: React.FC<FormReponseProcessesProps> = ({
  processes,
}) => {
  const { user } = useAuthStore();

  return (
    <div>
      <div>
        <div className="flex items-center justify-center mb-2 md:mb-4">
          <span className="font-medium text-gray-800">
            Quá Trình Xử Lý Mẫu Đơn
          </span>
        </div>

        <div className="w-full space-y-2 md:space-y-4">
          {processes?.length > 0 &&
            processes?.map((process) => (
              <FormResponseProcessCard
                key={process.id}
                data={process}
                isActive={
                  process?.form_processing_step?.department_id ===
                  user?.department_id
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FormReponseProcesses;
