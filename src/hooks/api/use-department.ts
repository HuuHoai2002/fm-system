import { getAllDepartments } from "@/services/department.service";
import { useQuery } from "@tanstack/react-query";

const useDepartments = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getAllDepartments(`?limit=20`),
  });

  return {
    departments: data?.data?.results || [],
    isFetching,
  };
};

export default useDepartments;
