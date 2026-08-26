import { redirect } from 'next/navigation';

export default function SelfTestPage() {
  redirect('/');
  return null;
}
