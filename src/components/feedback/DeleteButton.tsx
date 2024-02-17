import { FaTrashAlt } from '@react-icons/all-files/fa/FaTrashAlt';
export default function DeleteButton() {
  const handleDelete = () => {};
  return (
    <button className="absolute -right-[34px] top-[.625rem] border border-gray30 rounded-e-bs_5 bg-white p-[6px]">
      <FaTrashAlt size={20} />
    </button>
  );
}
