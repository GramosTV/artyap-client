<template>
  <div class="spinner"></div>
</template>
<style lang="scss" scoped>
.spinner {
  width: 10em;
  height: 10em;
  &::before {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(45deg);
    animation: 750ms rotateBefore infinite linear reverse;
  }
  &::after {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(45deg);
    animation: 750ms rotateAfter infinite linear;
  }
  &::before,
  &::after {
    box-sizing: border-box;
    content: '';
    display: block;
    position: absolute;
    width: 10em;
    height: 10em;
    transform-style: preserve-3d;
    transform-origin: 50%;
    transform: rotateY(50%);
    perspective-origin: 50% 50%;
    perspective: 340px;
    background-size: 10em 10em;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY2cHgiIGhlaWdodD0iMjk3cHgiIHZpZXdCb3g9IjAgMCAyNjYgMjk3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDx0aXRsZT5zcGlubmVyPC90aXRsZT4KICAgIDxkZXNjcmlwdGlvbj5DcmVhdGVkIHdpdGggU2tldGNoICgodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gpPC9kZXNjcmlwdGlvbj4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxwYXRoIGQ9Ik0xNzEuNTA3ODEzLDMuMjUwMDAwMzggQzIyNi4yMDgxODMsMTIuODU3NzExMSAyOTcuMTEyNzIyLDcxLjQ5MTI4MjMgMjUwLjg5NTU5OSwxMDguNDEwMTU1IEMyMTYuNTgyMDI0LDEzNS44MjAzMSAxODYuNTI4NDA1LDk3LjA2MjQ5NjQgMTU2LjgwMDc3NCw4NS43NzM0MzQ2IEMxMjcuMDczMTQzLDc0LjQ4NDM3MjEgNzYuODg4NDYzMiw4NC4yMTYxNDYyIDYwLjEyODkwNjUsMTA4LjQxMDE1MyBDLTE1Ljk4MDQ2ODUsMjE4LjI4MTI0NyAxNDUuMjc3MzQ0LDI5Ni42Njc5NjggMTQ1LjI3NzM0NCwyOTYuNjY3OTY4IEMxNDUuMjc3MzQ0LDI5Ni42Njc5NjggLTI1LjQ0OTIxODcsMjU3LjI0MjE5OCAzLjM5ODQzNzUsMTA4LjQxMDE1NSBDMTYuMzA3MDY2MSw0MS44MTE0MTc0IDg0LjcyNzU4MjksLTExLjk5MjI5ODUgMTcxLjUwNzgxMywzLjI1MDAwMDM4IFoiIGlkPSJQYXRoLTEiIGZpbGw9IiM2MDZjMzgiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+');
  }
}
@keyframes rotateBefore {
  from {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(0deg);
  }

  to {
    transform: rotateX(60deg) rotateY(45deg) rotateZ(-360deg);
  }
}

@keyframes rotateAfter {
  from {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(0deg);
  }

  to {
    transform: rotateX(240deg) rotateY(45deg) rotateZ(360deg);
  }
}
</style>
