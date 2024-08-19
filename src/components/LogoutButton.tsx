'use client';

import { LogOut } from '@/actions/actions';
import { Button } from './ui/button';

export default function LogoutButton() {
	return <Button onClick={async () => await LogOut()}>Log Out</Button>;
}
