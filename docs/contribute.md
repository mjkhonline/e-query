<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    name: 'Mohammad Javad Khademian',
    title: 'Creator',
    avatar: 'https://www.github.com/mjkhonline.png',
    links: [
      { icon: 'github', link: 'https://www.github.com/mjkhonline' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/mjkhademian/' }
    ]
  }
]
</script>

# Contribute

Thanks for your interest in contributing to e-query!
We are open to any kind of contribution.

Chat with me on [Telegram](https://t.me/mjkhonline).


# Contributors

Here is a list of people who have contributed to e-query.
<VPTeamMembers size="medium" :members="members" />
