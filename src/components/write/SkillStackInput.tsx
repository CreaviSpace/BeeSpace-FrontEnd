interface SkillStackInput {
  techStackDtos: { techStackId: number }[];
  setTechStackDtos: (techStackDtos: { techStackId: number }[]) => void;
}

export default function SkillStackInput({
  techStackDtos,
  setTechStackDtos,
}: SkillStackInput) {
  const data = [{ skill: 'React', id: 1 }];

  const handleTechStackDtosPush = (id: number) => {
    if (techStackDtos.some((item) => item.techStackId === 0)) {
      setTechStackDtos([{ techStackId: id }]);
    } else if (!techStackDtos.some((item) => item.techStackId === id)) {
      setTechStackDtos([{ techStackId: id }, ...techStackDtos]);
    }
  };

  return (
    <>
      <h2 className="text-bs_20 mb-5 font-bold">기술 스택</h2>
      <input
        type="text"
        placeholder={`입력해주세요.`}
        className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
      />

      <ul className="relative rounded-bs_5 overflow-hidden border border-gray10  bg-white z-[10]">
        {data.map((item) => (
          <li
            key={item.id}
            className="w-full h-[3.125rem] p-[0.625rem] hover:bg-gray10 flex items-center"
            datatype="0"
            onClick={() => {
              handleTechStackDtosPush(item.id);
            }}>
            {item.skill}
          </li>
        ))}
      </ul>

      <ul className="flex mt-5">
        {techStackDtos?.map((item, index) => {
          if (item.techStackId === data[index].id) {
            return (
              <li
                key={item.techStackId}
                className="w-10 h-10 rounded-full border border-gray10"></li>
            );
          }
        })}
      </ul>
    </>
  );
}
