import CustomButton from './CustomButton';

interface IOnoffButtonProps {
  value: string;
  setValue: (value: string) => void;
  list: { key: string; name: string }[];
}

export default function OnoffButton({
  value,
  setValue,
  list,
}: IOnoffButtonProps) {
  return (
    <>
      {list.map((item, index) => (
        <CustomButton
          key={`${item}-${index}`}
          color={value === item.key ? 'secondary' : 'default'}
          className="py-2 px-6 mr-5"
          onClick={() => {
            setValue(item.key);
          }}>
          {item.name}
        </CustomButton>
      ))}
    </>
  );
}
