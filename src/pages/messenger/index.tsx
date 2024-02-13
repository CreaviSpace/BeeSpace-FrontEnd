import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { FaChevronCircleDown } from '@react-icons/all-files/fa/FaChevronCircleDown';
import { FaRegImages } from '@react-icons/all-files/fa/FaRegImages';
import { FaTelegramPlane } from '@react-icons/all-files/fa/FaTelegramPlane';

import UserProfileButton from '@/components/button/UserProfileButton';
import UserConnectiont from '@/components/user/UserConnectiont';

export default function Messenger() {
  const user = [1, 2, 3];

  const message = [
    { id: 'my', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'my', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'you', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'my', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'you', content: '안녕하세요.', date: '2020-02-01' },
    {
      id: 'my',
      content: '안녕하세요안녕하세요안녕하세요안녕하세요.',
      date: '2020-02-01',
    },
    { id: 'you', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'you', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'my', content: '안녕하세요.', date: '2020-02-01' },
    { id: 'my', content: '안녕하세요.', date: '2020-02-01' },
    {
      id: 'you',
      content:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요.',
      date: '2020-02-01',
    },
  ];
  return (
    <main className="w-full h-[calc(100vh_-_4rem)] overflow-hidden">
      <div className="max-w-max_w h-full border-x m-auto flex">
        <section className="w-[18.75rem] ">
          <h2 className="p-5 text-center font-bold text-bs_22">대화 생대</h2>
          <div className="flex justify-center items-center p-5 gap-1 border-y border-gray10">
            <AiOutlineSearch size={25} />
            <input type="text" placeholder="사용자를 입력해주세요" />
          </div>
          <ul>
            {user.map((item) => (
              <UserConnectiont
                key={item}
                value="nickname"
                content="안녕하세요"
                className="py-5 px-2 border-b border-gray10"
              />
            ))}
          </ul>
        </section>
        <section className="w-full border-l border-gray10">
          <div className="relative h-[calc(100%_-_5rem)] overflow-auto">
            <div className="border-b border-gray10 p-5">
              <UserProfileButton userName="author" />
            </div>

            <div className="w-full h-fit py-5 overflow-y-auto">
              <ul className="w-full h-fit px-5">
                {message.map((item, index) => {
                  if (item.id === 'my') {
                    return (
                      <li
                        key={`${item}-${index}`}
                        className="max-w-[50%] w-fit ml-auto text-right">
                        <p className="bg-yellow10 p-3 rounded-full rounded-tr-none">
                          {item.content}
                        </p>
                        <p className="text-gray40 px-1">{item.date}</p>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={`${item}-${index}`}
                        className="flex max-w-[50%] w-fit mr-auto items-start">
                        <UserProfileButton />
                        <div>
                          <p className="bg-blue10 p-3 rounded-full rounded-tl-none">
                            {item.content}
                          </p>
                          <p className="text-gray40 px-1">{item.date}</p>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <button className="absolute bottom-10 left-[calc(50%_-_15px)]">
              <span className="fixed">
                <FaChevronCircleDown size={30} color="#FFC700" />
              </span>
            </button>
          </div>

          <nav className="w-full h-20 bg-blue10 flex justify-between items-center p-5">
            <button className="w-fit mr-5">
              <FaRegImages size={30} />
            </button>
            <input
              type="text"
              className="w-full h-full rounded-bs_5 p-3"
              placeholder="메시지를 입력해주세요."
            />
            <button className="w-24 px-2 py-2 ml-5 flex justify-center items-center bg-primary rounded-bs_5 gap-1">
              <span>전송</span>
              <FaTelegramPlane size={20} />
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}
