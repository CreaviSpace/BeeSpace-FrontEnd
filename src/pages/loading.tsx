import Image from 'next/image';
import React from 'react';

export default function Loading() {
  return (
    <main className="w-screen h-[calc(100vh-15.625rem-4rem)] flex justify-center items-center bg-white">
      <section className="w-full h-screen absolute top-0 left-0 flex justify-center items-center z-50 bg-inherit">
        <h1 className="sr-only">페이지 로딩중...</h1>
        <div className="relative flex justify-center h-[330px]">
          <div className="top-0 w-fit">
            <Image
              src="/BS_Loading_honeycomb1.png"
              alt=""
              width={250}
              height={250}
            />
          </div>
          <div className="absolute top-0 w-[240px] h-[240px] rounded-full loading-bee-image">
            <Image
              src="/BS_Loading_bee1.png"
              alt=""
              width={35}
              height={35}
              className="rotate-180"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
