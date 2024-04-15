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
    <div className="min_mobile:flex min_mobile:flex-col min_mobile:gap-2">
      {list.map((item, index) => (
        <CustomButton
          key={`${item}-${index}`}
          color={value === item.key ? 'secondary' : 'default'}
          className="py-2 px-6 mr-5 mobile:mr-1"
          onClick={() => {
            setValue(item.key);
          }}>
          {item.name}
        </CustomButton>
      ))}
    </div>
  );
}
