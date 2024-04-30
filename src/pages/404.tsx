import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import CustomButton from './../components/button/CustomButton';

export default function Custom404() {
  return (
    <main className="h-[calc(100vh-15.625rem-4rem)] w-screen bg-blue10 flex justify-center items-center">
      <section className="flex flex-col items-center">
        <h2 className="sr-only">404 Error</h2>
        <figure className="flex flex-col items-center mb-6">
          <Image
            src="/BS_404.png"
            alt="요청하신 페이지를 찾을 수 없습니다."
            width={406}
            height={184}
          />
          <figcaption className="flex flex-col items-center gap-4 font-Roboto">
            <p className="text-bs_24 font-bold">
              요청하신 페이지를 찾을 수 없습니다.
            </p>
            <p className="text-gray30 max-w-[500px] text-center flex flex-col">
              <span>페이지의 주소가 잘못 입력되었거나,</span>
              <span>
                주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
              </span>
            </p>
          </figcaption>
        </figure>
        <Link href="/">
          <CustomButton color="primary" className="p-2 cursor-pointer z-10">
            홈으로 가기
          </CustomButton>
        </Link>
      </section>
    </main>
  );
}
