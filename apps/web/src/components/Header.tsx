'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/authSlices';

function Header() {
  const path: string = usePathname();

  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth.loginStatus);
  const dispatch = useAppDispatch();

  return (
    <AppBar position="static" color="transparent" elevation={6}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <img
                src="/appLogo.svg"
                alt="Logo"
                style={{ height: '30px', marginRight: '10px' }}
              />
            </Link>
            EVENTICA
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Our events</Button>
          <Button color="inherit">Community</Button>
          <Button color="inherit">Contact</Button>

          {isLogin ? (
            <>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  dispatch(logout());
                  router.push('/login');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/login"
                variant={path.startsWith('/login') ? 'contained' : 'outlined'}
              >
                Login
              </Button>
              <Button
                href="/register"
                variant={
                  path.startsWith('/register') ? 'contained' : 'outlined'
                }
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
