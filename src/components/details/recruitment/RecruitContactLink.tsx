import Link from 'next/link';

interface IRecruitContactLinkProps {
  contact: string;
  contactWay: string | null;
}
export default function RecruitContactLink({
  contact,
  contactWay,
}: IRecruitContactLinkProps) {
  return (
    <div className="flex-1 underline underline-offset-2 decoration-gray-400">
      <Link href={contact} target="_blank" rel="noopener noreferrer">
        {contactWay}
      </Link>
    </div>
  );
}
