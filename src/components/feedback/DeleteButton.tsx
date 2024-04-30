import { FaTrashAlt } from '@react-icons/all-files/fa/FaTrashAlt';

interface IHandleDeleteProps {
  handleDelete: () => void;
}
export default function DeleteButton({ handleDelete }: IHandleDeleteProps) {
  return (
    <button
      onClick={handleDelete}
      className="absolute -right-[2.125rem] top-[0.125rem] border border-gray30 rounded-e-bs_5 bg-white p-[6px] mt-2 tablet:static mobile:static">
      <FaTrashAlt size={20} />
    </button>
  );
}
