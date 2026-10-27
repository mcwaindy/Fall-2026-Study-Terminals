// Module 9: Linux processes and scheduling. Appends to the shared data arrays read by nos-chapters.js.
(function () {
  const MC = (q, correct, why, ...wrong) => { const c = [...wrong]; c.splice(Math.abs(q.length) % (wrong.length + 1), 0, correct); return { q, c, a: c.indexOf(correct), why }; };
  const TF = (q, ans, why) => ({ q, c: ["True", "False"], a: ans ? 0 : 1, why });
  const C = (m, name, desc, syntax, examples, flags, ...concepts) => ({ m, name, desc, syntax, examples, flags, concepts });
  const A = (...a) => a;

  Object.assign(window.CONCEPTS = window.CONCEPTS || {}, {
    "ps-view": [9, "Viewing processes (ps, /proc, top)"], "kill": [9, "Killing processes & signals"],
    "proc-exec": [9, "Process execution: fork/exec"], "bg": [9, "Background jobs"],
    "priority": [9, "Priorities, nice & renice"], "sched": [9, "Scheduling with at"], "cron": [9, "Scheduling with cron"]
  });

  (window.NOTES = window.NOTES || []).push({ m: 9, title: "Processes & Scheduling", sections: [
    { c: "ps-view", t: "Viewing processes with ps", b: [
      "`ps` is the most versatile and common way to view processes. With no arguments it lists the processes running in your current shell.",
      "- `-f` (full) adds the **UID** of the user who started the process, the **PPID** (parent PID) and the start time (**STIME**)",
      "- **Daemon** processes are not tied to a terminal, so `ps -f` does not show them",
      "- `-e` lists every process across all terminals, including daemons",
      "$ ps -f",
      "$ UID          PID    PPID  C STIME TTY          TIME CMD",
      "$ dylan        453     452  0 14:46 pts/0    00:00:00 /bin/bash",
      "$ dylan       1044     453  0 16:20 pts/0    00:00:00 ps -f",
      "Pipe `ps -ef` into `less` to read it page by page, or into `grep` to show only matching lines, for example `ps -ef | grep bash`. `grep` itself may appear in the output because it is in memory at that moment.",
      "`-l` shows even more than `-f`, including the flag (F), state (S), priority (PRI), nice value (NI), memory address (ADDR), size (SZ) and wait channel (WCHAN)."
    ]},
    { c: "ps-state", t: "Process state, zombies and priority columns", b: [
      "The **process flag (F)** shows features of the process; a flag of 4 means root ran it. The **process state (S)** column is the most valuable to admins because it shows what the process is doing right now.",
      "- **S** = interruptible sleep (not on the CPU right now; most processes sit here and are woken by other processes)",
      "- **R** = running",
      "- **D** = uninterruptible sleep, waiting for disk access",
      "- **T** = stopped or being traced by another process",
      "- **Z** = **zombie** (defunct): finished executing, but its parent has not released its PID",
      "On a server, zombies can pile up and prevent new processes from being created. Kill the **parent** of the zombies to fix it. View zombies system-wide with `ps -el | grep Z`.",
      "**PRI** is the priority the kernel uses, from **0 (high priority)** to **127 (low priority)**. The **nice value (NI)** influences it indirectly, from **-20 (greater chance of high priority)** to **19 (lower chance)**.",
      "**ADDR** is the process's memory address, **WCHAN** shows what a sleeping process is waiting for, and **SZ** is the memory size in KB (roughly the size of the executable)."
    ]},
    { c: "ps-bsd", t: "Berkeley options, /proc, top and rogue processes", b: [
      "Some `ps` options have no leading dash. These are **Berkeley-style** options. The two most common are `a` (all processes across terminals) and `x` (processes **not** run on a terminal). With these, the state column is named **STAT** and may carry extra characters: **W** means no contents in memory, **<** means high priority, **N** means low priority.",
      "The kernel exports all process information under **/proc**. Each subdirectory is named for the **PID** of the process it describes, alongside files such as `cpuinfo`, `meminfo`, `loadavg`, `uptime`, `mounts` and `version`.",
      "A **rogue** (runaway) process is faulty and consumes far more system resources than it should. It shows up at the top of the `top` listing.",
      "`top` is an interactive screen listing processes ordered by processor time, so the biggest CPU users are at the top. Press `h` inside `top` for the commands it supports. Many admins install `htop`, which does the same job in color with a resource graph and usage legend."
    ]},
    { c: "kill", t: "Killing processes and kill signals", b: [
      "When many rogue and zombie processes use up resources, send them a **kill signal** to terminate them. The most common command is `kill`, which can send many signals; `kill -l` lists their names and numbers. These five are the most common:",
      "- **SIGHUP (1)** hang-up: stops a process then restarts it with the same PID. Often sent to a daemon after you edit its config file so it rereads it",
      "- **SIGINT (2)** interrupt: one of the weakest, but works most of the time. **Ctrl+C is a SIGINT**",
      "- **SIGQUIT (3)** core dump: terminates the process and saves its memory to a file named `core` in the current directory. **Ctrl+\\\\**",
      "- **SIGTERM (15)** software termination: the **default** for `kill`, and the most common signal programs use to kill other processes",
      "- **SIGKILL (9)** absolute kill: forces the kernel to stop the process. It **cannot be trapped** by any process",
      "Give the signal as an option, then the PID. If you give no signal, `kill` sends SIGTERM.",
      "$ ps -ef | grep sample",
      "$ kill -3 1199",
      "$ ps -ef | grep sample",
      "Some processes can ignore (**trap**) certain signals. Only SIGKILL cannot be trapped, but use it as a **last resort** because the process cannot close open files and other resources cleanly. Check what a process has open with `lsof` (list open files) before sending SIGKILL."
    ]},
    { c: "kill-find", t: "Finding and killing by name", b: [
      "- `pidof` finds the PID of a process by name, to use as an argument to `kill`",
      "- `pgrep` returns the PIDs of processes matching a regex or other criteria, often easier for locating processes",
      "- `killall` kills by **process name** instead of PID, and can kill several processes of the same name at once. SIGTERM is still the default",
      "- `pkill` also kills by name, and lets you match with a regex and other criteria",
      "$ pgrep -u bini \"^psql\"",
      "$ pkill -u bini -3 \"^psql\"",
      "You can also kill from inside `top`: press `k`, then enter the PID and the signal when prompted.",
      "If you kill a **parent** process, it terminates all its child processes before ending itself, which is often necessary for zombies. To stop a parent from killing a child, start the child with the **`nohup`** command."
    ]},
    { c: "proc-exec", t: "Process execution: fork, exec, wait", b: [
      "You can run three main types of Linux commands: **binary programs**, **shell scripts** and **shell functions**.",
      "- Most commands are **binary programs** (`ls`, `find`, `grep`): compiled code that sits on the filesystem until it is run",
      "- Others are **shell functions** built into the running shell, such as `cd` and `exit`",
      "- **Shell scripts** hold a list of binary programs, shell functions and special constructs for the shell to run in order",
      "To run a compiled program or script, the shell that interprets your command creates a new shell. This is called **forking**, carried out by the **fork** function. The new subshell runs the program using its **exec** function. When done, the subshell uses its **exit** function to kill itself and return control to the original shell, which used its **wait** function to wait for it."
    ]},
    { c: "bg", t: "Foreground and background processes", b: [
      "A process the shell must **wait** for is a **foreground process**. Add an ampersand to omit the wait function; this makes it a **background process**, and the shell returns the prompt immediately. The space before the ampersand is optional.",
      "$ sample &",
      "$ [1] 2583",
      "The shell prints the **job ID** and the **PID**. Use `ps` or `jobs` to see background job IDs again. Job IDs are prefixed with **%**, for example `kill %1`.",
      "- `fg` moves a background process to the foreground",
      "- **Ctrl+Z** pauses a foreground process and gives it a job ID; `bg` then sends it to the background using that ID",
      "- With several background jobs, `jobs` marks the most recent with **+** and the second most recent with **-**",
      "- Using `%` with no ID operates on the most recent background process"
    ]},
    { c: "priority", t: "Process priorities, nice and renice", b: [
      "Most computers have a single CPU, so Linux runs small amounts of each process in series. A **time slice** is the amount of time a process gets on the CPU, usually measured in milliseconds, and several hundred processes can run in a single second. More time slices means faster execution.",
      "`ps -l` shows the kernel priority (**PRI**), which is directly related to the time slices a process gets. **PRI 0** is most likely to get CPU time and **PRI 127** the least. You cannot set PRI directly, but you can influence it with a **nice value**.",
      "- Any user can be \"nice\" and **raise** a nice value, but only **root** can **lower** it",
      "- Processes start with a nice value of **0**",
      "- `nice -n` starts a command with a given value",
      "- `renice` changes the priority of a process that is already running",
      "$ nice -n 19 ps -l",
      "$ renice +15 1990 2180",
      "In `top`, press `r`, then enter the PID and nice value. Root can use `renice` on all processes of a user or group:",
      "$ renice +15 -u mary bini",
      "$ renice +15 -g sys"
    ]},
    { c: "sched", t: "Scheduling commands: atd and cron", b: [
      "Sometimes you want a command to run at a future time, such as system maintenance during non-working hours. Two daemons schedule commands:",
      "- The **at daemon (atd)** schedules a command to run **once** in the future",
      "- The **cron daemon (crond)** schedules a command to run **repeatedly**"
    ]},
    { c: "at", t: "Scheduling with at", b: [
      "Give the time as an argument to `at`. Common formats:",
      "- `at 10:15pm` runs at 10:15 PM on the current date",
      "- `at 10:15pm July 15` runs at 10:15 PM on July 15",
      "- `at midnight` / `at noon July 15` / `at teatime` (4:00 PM today) / `at tomorrow`",
      "- `at now + 5 minutes`, `at now + 10 hours`, `at now + 4 days`, `at now + 2 weeks`",
      "- `at 9:00am 01/03/2023`, `at 9:00am 01032023` or `at 9:00am 03.02.2023` for specific dates",
      "- `at now` (or `batch`) runs immediately",
      "After you run `at`, it shows an **`at>`** prompt. Enter commands one per line, then press **Ctrl+D** to schedule them.",
      "$ at 10:15pm July 15",
      "$ at> date > /root/atfile",
      "$ at> who >> /root/atfile",
      "$ at> <Ctrl+D>",
      "$ job 1 at Wed Jul 15 22:15:00 2023",
      "`atd` uses the current shell's environment, stored in `/var/spool/at` (Fedora) or `/var/spool/cron/atjobs` (Ubuntu). Most distros have no mail daemon, so **redirect output to a file** in scheduled commands."
    ]},
    { c: "at-manage", t: "Managing at jobs and access control", b: [
      "`at` returns a **job ID** that you can use to query or remove the job.",
      "- `at -l` lists job IDs. Regular users see only their own jobs; **root sees all**",
      "- `at -c <ID>` shows the job's contents along with the environment saved when it was scheduled",
      "- `at -d <ID>` removes the job",
      "- `at -f <file>` schedules a shell script instead of typing commands, for example `at 10:15pm July 16 -f myscript`",
      "Access is controlled by two files:",
      "- If **neither** `/etc/at.allow` nor `/etc/at.deny` exists, **only root** may use `at`",
      "- To give others access, create the **allow** file and list usernames, one per line",
      "- The **deny** file blocks the listed users; anyone not listed is allowed",
      "- If **both** exist, only the allow file is checked and the deny file is ignored"
    ]},
    { c: "cron", t: "Scheduling with cron and cron tables", b: [
      "**cron** suits repetitive tasks. It reads configuration files called **cron tables**. A cron table entry has **six fields** separated by spaces or tabs: the first five give the run time and the sixth is the **absolute pathname** of the command. You can also schedule a shell script and give its pathname in the sixth field.",
      "- Field 1: minute (0-59)",
      "- Field 2: hour (0-23)",
      "- Field 3: day of month (1-31)",
      "- Field 4: month (1-12)",
      "- Field 5: day of week (0 or 7 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat)",
      "There are two kinds of cron tables: **user** tables for tasks individual users schedule, and **system** tables for system tasks.",
      "- User tables live in `/var/spool/cron` (Fedora) or `/var/spool/cron/crontabs` (Ubuntu)",
      "- System tables live in `/etc/crontab` and the `/etc/cron.d` directory"
    ]},
    { c: "crontab", t: "The crontab command", b: [
      "- `crontab -e` creates or edits your user cron table (opens `nano` on Fedora)",
      "- `crontab -l` lists your cron table",
      "- `crontab -r` removes your cron table and all its scheduled jobs",
      "- Root can use `-u` to edit, list or remove another user's table",
      "$ crontab -r -u mary"
    ]},
    { c: "cron-system", t: "System cron tables and scheduled directories", b: [
      "Linux systems usually run many commands during non-business hours, such as maintenance, backups and CPU-intensive programs. systemd timer units can do this, but they are often configured **by cron** from entries in `/etc/crontab`, which only **root** can edit.",
      "- The first section of `/etc/crontab` sets the **environment** used to run commands; the rest are comments describing the entry format",
      "- Entries you add there run as **root**, but you can prefix an entry with a **user account** to run it as that user",
      "- A table with the same format can go in `/etc/cron.d`; every entry in that directory is run by the system",
      "For tasks that run hourly, daily and so on, skip the table entry: place a **shell script** in one of these directories:",
      "- `/etc/cron.hourly`",
      "- `/etc/cron.daily`",
      "- `/etc/cron.weekly`",
      "- `/etc/cron.monthly`",
      "The **anacron** daemon is started by cron to run scheduled tasks. Unlike cron, if the system was powered off during the scheduled time, anacron runs the task at the **next power on**. Crontab details differ between distributions."
    ]}
  ]});

  (window.CARDS = window.CARDS || []).push(
    [9, "What does ps -f add to the basic ps output?", "UID (user who started it), PPID (parent PID) and STIME (start time)."],
    [9, "Why does ps -f not show daemons?", "Daemons are not associated with a terminal; add -e to list all processes."],
    [9, "Process state codes S, R, D, T, Z?", "S interruptible sleep, R running, D uninterruptible sleep (disk), T stopped/traced, Z zombie."],
    [9, "What is a zombie process and how do you fix a pile of them?", "A finished process whose parent has not released its PID. Kill the parent."],
    [9, "How do you list zombie processes system-wide?", "ps -el | grep Z"],
    [9, "PRI range?", "0 (high priority) to 127 (low priority)."],
    [9, "Nice value range?", "-20 (greater chance of high priority) to 19 (lower chance). Default is 0."],
    [9, "What are Berkeley-style ps options a and x?", "a lists all processes across terminals; x lists processes not run on a terminal."],
    [9, "Where does the kernel export process info?", "/proc, with one subdirectory named for each PID."],
    [9, "What is a rogue (runaway) process?", "A faulty process consuming far more resources than it should; it tops the top listing."],
    [9, "What does htop add over top?", "Color output, a resource graph and a usage legend."],
    [9, "SIGHUP number and use?", "1; stops and restarts a process with the same PID, often to reread a config file."],
    [9, "SIGINT number?", "2; Ctrl+C. One of the weakest signals."],
    [9, "SIGQUIT number?", "3; core dump to a file named core. Ctrl+\\."],
    [9, "SIGTERM number?", "15; the default signal for kill and killall."],
    [9, "SIGKILL number?", "9; cannot be trapped. Last resort because files are not closed cleanly."],
    [9, "How do you list signal names and numbers?", "kill -l"],
    [9, "Which command lists the files a process has open?", "lsof (use it before sending SIGKILL)."],
    [9, "kill vs killall vs pkill?", "kill uses a PID; killall uses an exact process name; pkill matches names with regex and other criteria."],
    [9, "How do you stop a parent from killing its child?", "Start the child with nohup."],
    [9, "What does the shell do to run a program?", "Forks a new subshell, which execs the program and then exits; the original shell waits."],
    [9, "How do you run a command in the background?", "Append an ampersand (&)."],
    [9, "How do you pause a foreground job and resume it in the background?", "Ctrl+Z, then bg."],
    [9, "How do you refer to a background job ID?", "Prefix it with %, e.g. kill %1."],
    [9, "What do + and - mean in jobs output?", "+ is the most recent job; - is the second most recent."],
    [9, "Who can lower a nice value?", "Only root. Any user can raise it."],
    [9, "How do you start a command with nice value 19?", "nice -n 19 command"],
    [9, "How do you change priority of a running process?", "renice +15 PID (or renice +15 -u user / -g group as root)."],
    [9, "atd vs crond?", "atd runs a command once in the future; crond runs commands repeatedly."],
    [9, "How do you finish entering commands at the at> prompt?", "Press Ctrl+D."],
    [9, "Why redirect output of at jobs to a file?", "Most distros have no mail daemon to deliver the output."],
    [9, "at -l, at -c, at -d?", "List jobs, show a job's contents and environment, delete a job."],
    [9, "If neither at.allow nor at.deny exists, who can use at?", "Only root."],
    [9, "If both at.allow and at.deny exist?", "Only the allow file is checked."],
    [9, "The six fields of a cron table entry?", "Minute, hour, day of month, month, day of week, then the absolute path of the command."],
    [9, "Cron day-of-week numbers?", "0 or 7 = Sun, 1 = Mon ... 6 = Sat."],
    [9, "Where are user cron tables stored?", "/var/spool/cron (Fedora) or /var/spool/cron/crontabs (Ubuntu)."],
    [9, "Where are system cron tables?", "/etc/crontab and /etc/cron.d."],
    [9, "crontab -e, -l, -r?", "Edit, list and remove your cron table."],
    [9, "Where do you drop a script for hourly, daily, weekly or monthly runs?", "/etc/cron.hourly, /etc/cron.daily, /etc/cron.weekly, /etc/cron.monthly."],
    [9, "How does anacron differ from cron?", "If the system was off at the scheduled time, anacron runs the task at the next power on."]
  );

  (window.QUIZ_RAW = window.QUIZ_RAW || []).push(
    [9, MC("Which ps option lists processes from all terminals, including daemons?", "-e", "-e lists every process; plain ps shows only the current shell.", "-f", "-l", "-d")],
    [9, MC("Which ps option adds the UID, PPID and start time?", "-f", "-f is the full listing.", "-e", "-x", "-t")],
    [9, MC("What does a process state of Z indicate?", "Zombie: finished but parent has not released its PID", "Kill the parent to clear zombies.", "Running", "Uninterruptible sleep", "Stopped by a tracer")],
    [9, MC("Which process state means waiting for disk access?", "D", "D is uninterruptible sleep.", "R", "T", "S")],
    [9, MC("What is the PRI value that is most likely to get CPU time?", "0", "0 is high priority; 127 is lowest.", "127", "19", "-20")],
    [9, MC("What is the nice value range?", "-20 to 19", "Lower nice means a better chance of high priority.", "0 to 127", "1 to 100", "-127 to 0")],
    [9, MC("Which directory holds a subdirectory for each running PID?", "/proc", "The kernel exports process info under /proc.", "/var/run", "/dev", "/sys/pids")],
    [9, MC("Which tool is an interactive, real-time process viewer ordered by CPU time?", "top", "htop offers color and graphs.", "ps", "jobs", "lsof")],
    [9, MC("Which signal is the default for kill?", "SIGTERM (15)", "No signal given means SIGTERM.", "SIGKILL (9)", "SIGHUP (1)", "SIGINT (2)")],
    [9, MC("Which signal can never be trapped by a process?", "SIGKILL", "That is why it is a last resort.", "SIGTERM", "SIGINT", "SIGHUP")],
    [9, MC("Ctrl+C sends which signal?", "SIGINT", "Interrupt, number 2.", "SIGQUIT", "SIGTERM", "SIGKILL")],
    [9, MC("Which signal causes a core dump?", "SIGQUIT", "Number 3, Ctrl+\\.", "SIGHUP", "SIGINT", "SIGTERM")],
    [9, MC("Which signal is often sent to a daemon so it rereads its configuration?", "SIGHUP", "It restarts the process with the same PID.", "SIGKILL", "SIGQUIT", "SIGSTOP")],
    [9, MC("Which command shows what files a process has open before you kill it?", "lsof", "List open files.", "pidof", "pgrep", "jobs")],
    [9, MC("Which command kills processes by name and allows regex matching?", "pkill", "killall uses exact names.", "kill", "pidof", "renice")],
    [9, MC("How do you prevent a parent's death from killing a child?", "Start the child with nohup", "Otherwise killing a parent terminates its children.", "Use SIGKILL", "Use nice -n 19", "Use fg")],
    [9, MC("Which function does the shell use to create a new process?", "fork", "The subshell then uses exec to run the program.", "wait", "exit", "exec")],
    [9, MC("Which is a shell function, not a binary program?", "cd", "cd is built into the running shell.", "ls", "grep", "find")],
    [9, MC("What does appending & to a command do?", "Runs it as a background process", "The prompt returns immediately.", "Runs it as root", "Redirects its output", "Schedules it with cron")],
    [9, MC("Which key sequence pauses the foreground process?", "Ctrl+Z", "Then bg resumes it in the background.", "Ctrl+C", "Ctrl+D", "Ctrl+\\")],
    [9, MC("How do you bring a background job to the foreground?", "fg", "Use fg %1 for a specific job.", "bg", "jobs", "nohup")],
    [9, MC("In jobs output, which symbol marks the most recent job?", "+", "- marks the second most recent.", "-", "*", "%")],
    [9, MC("Who can lower a process's nice value?", "Only root", "Any user may raise it.", "Any user", "The process owner only", "Only the parent process")],
    [9, MC("Which command changes the priority of an already-running process?", "renice", "nice only starts new commands with a value.", "nice", "kill", "top -n")],
    [9, MC("Which daemon runs a command once at a future time?", "atd", "crond repeats commands.", "crond", "anacron", "systemd-logind")],
    [9, MC("How do you finish entering commands at the at> prompt?", "Ctrl+D", "This schedules the job.", "Ctrl+C", "Ctrl+Z", "Enter twice")],
    [9, MC("Which command removes an at job?", "at -d", "Give the job ID.", "at -l", "at -c", "at -r")],
    [9, MC("If neither /etc/at.allow nor /etc/at.deny exists, who can use at?", "Only root", "Create at.allow to grant others access.", "Everyone", "No one", "Members of the wheel group")],
    [9, MC("How many fields does a cron table entry have?", "Six", "Five time fields and the command path.", "Five", "Seven", "Four")],
    [9, MC("In a cron table, which field is the hour?", "The second field", "Fields: minute, hour, day of month, month, day of week.", "The first field", "The third field", "The fifth field")],
    [9, MC("Which command lists your user cron table?", "crontab -l", "-e edits and -r removes.", "crontab -e", "crontab -r", "cron -l")],
    [9, MC("Which crontab option removes the table and all its jobs?", "-r", "Root can add -u user.", "-e", "-l", "-d")],
    [9, MC("Where are system cron tables kept?", "/etc/crontab and /etc/cron.d", "User tables are under /var/spool/cron.", "/var/spool/cron", "/etc/at.allow", "/usr/lib/cron")],
    [9, MC("Where do you place a script that should run daily without a cron entry?", "/etc/cron.daily", "Also hourly, weekly and monthly directories.", "/etc/crond", "/var/cron.daily", "/usr/cron/daily")],
    [9, MC("What does anacron do that cron does not?", "Runs missed tasks at the next power on", "Useful for systems that are not always on.", "Runs tasks once only", "Runs tasks every second", "Schedules at jobs")],
    [9, TF("A zombie process can be fixed by killing the parent process.", true, "The parent never released the zombie's PID.")],
    [9, TF("SIGKILL can be trapped by a process.", false, "SIGKILL is the only signal that cannot be trapped.")],
    [9, TF("Only root can raise a process's nice value.", false, "Any user can raise it; only root can lower it.")],
    [9, TF("The at command repeats a command on a schedule.", false, "at runs once; cron repeats.")],
    [9, TF("If both at.allow and at.deny exist, the deny file is not processed.", true, "Only the allow file is checked.")]
  );

  (window.COMMANDS = window.COMMANDS || []).push(
    C(9, "ps -ef", "List every process across all terminals, with UID and PPID", "ps -ef", A("ps -ef", "ps -ef | grep bash", "ps -el | grep Z"), A("-e all processes", "-f full format", "-l long format"), "Viewing processes"),
    C(9, "kill", "Send a signal to a process (default SIGTERM)", "kill [-signal] PID", A("kill 1199", "kill -9 1199", "kill -l", "kill %1"), A("-l list signals", "-9 SIGKILL", "-15 SIGTERM"), "Killing processes"),
    C(9, "killall", "Kill processes by exact name", "killall [-signal] name", A("killall sample"), A(), "Killing processes"),
    C(9, "pkill", "Kill processes by name or regex", "pkill [-signal] [-u user] pattern", A("pkill -u bini -3 \"^psql\""), A("-u user"), "Killing processes"),
    C(9, "pgrep", "List PIDs matching a name or regex", "pgrep [-u user] pattern", A("pgrep -u bini \"^psql\""), A("-u user"), "Killing processes"),
    C(9, "pidof", "Find the PID of a named program", "pidof name", A("pidof sample"), A(), "Killing processes"),
    C(9, "lsof", "List the files a process has open", "lsof [-p PID]", A("lsof -p 1199"), A("-p PID"), "Killing processes"),
    C(9, "nohup", "Run a command that ignores hang-ups", "nohup command &", A("nohup ./sample &"), A(), "Background jobs"),
    C(9, "jobs", "List background jobs and their job IDs", "jobs", A("jobs"), A(), "Background jobs"),
    C(9, "bg", "Send a paused job to the background", "bg [%job]", A("bg %1"), A(), "Background jobs"),
    C(9, "fg", "Bring a background job to the foreground", "fg [%job]", A("fg %1"), A(), "Background jobs"),
    C(9, "nice", "Start a command with a nice value", "nice -n value command", A("nice -n 19 ps -l"), A("-n value"), "Priorities"),
    C(9, "renice", "Change the nice value of running processes", "renice value PID...", A("renice +15 1990 2180", "renice +15 -u mary bini", "renice +15 -g sys"), A("-u user", "-g group"), "Priorities"),
    C(9, "htop", "Colorized, interactive process viewer with resource graphs", "htop", A("htop"), A(), "Viewing processes"),
    C(9, "at", "Schedule commands to run once", "at TIME [-f file]", A("at 10:15pm July 15", "at now + 5 minutes", "at -l", "at -c 1", "at -d 1", "at 10:15pm July 16 -f myscript"), A("-l list", "-c show job", "-d delete", "-f script file"), "Scheduling"),
    C(9, "crontab", "Edit, list or remove a user cron table", "crontab [-u user] [-e | -l | -r]", A("crontab -e", "crontab -l", "crontab -r -u mary"), A("-e edit", "-l list", "-r remove", "-u user"), "Scheduling")
  );
})();
