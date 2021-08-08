#include <stdio.h>
#define U64 unsigned long long

unsigned int state = 1804289383;

unsigned int get_random_32()
{
  state ^= state << 13;
  state ^= state >> 17;
  state ^= state << 5;

  return state;
}

U64 get_random_64()
{
  U64 a, b, c, d;
  
  a = (U64) (get_random_32() & 0xFFFF);
  b = (U64) (get_random_32() & 0xFFFF);
  c = (U64) (get_random_32() & 0xFFFF);
  d = (U64) (get_random_32() & 0xFFFF);

  return a | (b << 16) | (c << 32) | (d << 48);
}

int main()
{
  printf("%ud\n", get_random_32());
  printf("%ud\n", get_random_32() & 0xFFFF);
   
  printf("%llu\n", get_random_64());

  return 0;
}