---
title: 'OSS From My Eyes'
type: 'WRITING'
date: '2021-02-28'
description: 'Notes from a guest lecture I gave on open source projects'
# cover: 'https://jakedawkins.com/static/112e8eb5809812362673631a48954af9/d2602/front.jpg'
---

> This is mostly a regurgitation of a talk I gave for a guest lecture at Clemson in February 2021. Since this was originally delivered as a lecture, the format very much is separated like it would be in a presentation (without the fun graphics), and some points won't be fleshed out fully. You can check out the full presentation [here](./presentation.pdf)

### Projects

I refer to open source "projects", not open source software, since "projects" is more inclusive of the ecosystem; the people, processes, and yes—code, involved in production of open source software.

### Stakeholders

**Maintainers**: Small group of people with responsibility for the direction and quality of the project

**Contributors**: Solving problems & committing code, empowered by maintainers

**Users**: Active vs passive users. Active users are users that also are involved in the ecosystem, not just consumers of the software

### Everyone has incentives

**Maintainers**: Solve a problem, help people, gain notoriety, support an ecosystem (like we do at Apollo)

**Contributors**: Learn a technology, help advance a project, gain notoriety

**Active Users**: Learn a technology, stay up-to-date, gain credibility (helps for job hunting)

### Responsibilities

**Maintainers**: Q&A, coordinating work, providing a community space, education, evangelism, write code lol

**Contributors**: Learn the project, solve actionable issues, move stalled issues along, lift workload from maintainers

**Active Users**: Education, spreading the word, answering questions, reporting bugs

> Everything takes more and more time as the project grows in popularity

### Where does all the work happen?

This is really the question of the decade. It feels like more and more of the open source ecosystem is coalescing around GitHub as the platform of choice, but the non-code portion of the ecosystem is still VERY much up for debate.

Chat platforms like Spectrum (RIP), Slack, Discord and forum platforms like Discourse and GitHub discussions are in a battle with general social media platforms like Twitter and Facebook for how communities that work on projects communicate, answer questions, and promote their tools.

Project management is a whole other issue. GitHub issues is a good place to track open tasks and issues, but doesn't offer much for coordinating and planning work. Communities choose all sorts of things for this like GitHub projects, Trello, Notion, or more feature-rich platforms like Jira. This of course also depends on who runs projects (corporate entities vs public communities).

### How are the bills getting paid?

AKA how are projects run?

Common patterns for project management include

- **BDFLs** (benevolent dictators for life)
- **Corporate Backers**: A company builds OSS to back other streams of revenue or hiring
- **Foundations/Technical committees**: Committees (often with paid membership) formally propose and vote on RFCs. TC39 for the JavaScript language is a good example of this.

### Being a good citizen

**Be Kind**

- Approach the project with kindness
- Assume the best of people
- Respect the time of others
- Understand decisions aren’t black/white

**Learn the Project**

- Read any readmes or contribution guidelines
- Does the project even accept outside contributions? If so, what kind & scope?
- Take a look at the Issue/PR templates
- How are issues managed?

**Open Thorough Issues**

- **Search other issues first**
- Write reasonable titles
- Use kind language explaining the issue _and_ its importance to you
- Supply workarounds to issues
- Reference other relevant issues
- As much detail about your environment as possible
- Reproduction cases (in a linked repo 💕)

**Open helpful PRs**

- **Seek permission first if it’s a large change**
- Reasonable titles
- Explain what you fixed in the body, not necessarily how you fixed it
- Reference relevant issues (use the “_Fixes #30_” syntax)
- **Write tests (and run them locally)**
- **Write documentation**
- Be patient

**Share Your Knowledge**

- Be an active user
- If you have thoughtful responses to questions/comments, give them!
- Go where the conversation is
- Don’t offer feedback where it’s not asked for

**Know that sometimes things don't go your way**

- Software projects are messy and frustrating, just like people and project management structures. Conway’s law!
- **Maintainers have a lot more context for many problems and the future of the project**
- Don’t annoy (or back-channel) contributors or maintainers
- Don’t be afraid to fork
