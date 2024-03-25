import OnoffButton from '@/components/button/OnOffButton';
interface IOnOffLineProps {
  proceedWay: string;
  setProceedWay: (contactWay: string) => void;
}
export default function OnOffLine({
  proceedWay,
  setProceedWay,
}: IOnOffLineProps) {
  const onoffList = [
    { key: 'on', name: '온라인' },
    { key: 'off', name: '오프라인' },
    { key: 'on/off', name: '온라인/오프라인' },
  ];
  return (
    <>
      <h2 className="text-bs_20 my-5">진행 방식</h2>
      <OnoffButton
        value={proceedWay}
        setValue={setProceedWay}
        list={onoffList}
      />
    </>
  );
}
