import { redirect } from 'next/navigation';

// Redirect /workshop-destrava-ligacoes to home page since workshop is now the main page
export default function WorkshopDestravaLigacoesPage() {
  redirect('/');
}

