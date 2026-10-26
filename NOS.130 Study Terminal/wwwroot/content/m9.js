/* Module 9 - Lessons 13 and 14: Hardware, peripherals, performance and troubleshooting */
(() => {
  const { note, Q, task } = NOS;
  NOS.addChapter({
    id: "m9", num: 9, title: "Hardware, Peripherals & Performance",
    summary: "USB, drivers, printers, displays, audio, Bluetooth, System Information, Task Manager, services, power, troubleshooting",
    notes: [
      note("usb", "Managing USB devices", "admin", [
        "USB devices are typically **plug-and-play**.",
        "- Use **Device Manager** to view and troubleshoot USB ports",
        "- **Safely eject** USB drives to prevent corruption"
      ]),
      note("drivers", "Updating and uninstalling drivers", "admin", [
        "**Drivers** are essential for hardware communication.",
        "- Update drivers via **Device Manager** or the **manufacturer's website**",
        "- **Uninstall** problematic drivers to resolve issues"
      ]),
      note("printers", "Printers and the print queue", "admin", [
        "Manage printing from Settings and the print queue.",
        "- Add printers via **Settings > Devices > Printers & scanners**",
        "- Manage print jobs in the **print queue**",
        "- Set the **default printer** and troubleshoot printing issues"
      ]),
      note("display", "Configuring displays and graphics adapters", "admin", [
        "Display settings control how screens and graphics adapters behave.",
        "- Adjust **resolution, orientation and multiple displays** in **Settings > System > Display**",
        "- Update **graphics drivers** for optimal performance"
      ]),
      note("audio", "Speakers, microphones and headsets", "admin", [
        "Audio devices are configured in sound settings.",
        "- Configure audio devices in **Settings > System > Sound**",
        "- Set the **default input/output devices**",
        "- Troubleshoot with sound settings and **test the devices**"
      ]),
      note("hwbest", "Best practices for hardware management", "admin", [
        "Good habits prevent most hardware issues.",
        "- Keep **drivers updated**",
        "- Use **Windows Update** for compatibility",
        "- Regularly check **Device Manager** for issues"
      ]),
      note("bluetooth", "Bluetooth and peripheral setup", "admin", [
        "**Pairing** requires opening **Bluetooth settings** and selecting the desired device to connect peripherals wirelessly.",
        "- **Connection requirements:** both devices must be **discoverable** and **within range**",
        "- **Common issues:** outdated drivers, interference and incorrect settings can disrupt connectivity",
        "Understanding Bluetooth setup and troubleshooting helps IT students support diverse devices and environments."
      ]),
      note("sysinfo", "Using System Information tools", "admin", [
        "The **System Information** tool (`msinfo32`) provides extensive details on **hardware and software configuration**.",
        "- Helps **diagnose performance problems** and identify **bottlenecks**",
        "- Supports **informed decisions**: optimize resources and plan hardware or software upgrades",
        "IT students should learn diagnostic tools for effective system management and troubleshooting."
      ]),
      note("taskmgr", "Monitoring with Task Manager", "admin", [
        "Task Manager monitors **CPU, memory, disk and network** usage.",
        "- Open with **Ctrl+Shift+Esc** or by **right-clicking the taskbar**",
        "- Use the **Performance** tab for real-time stats",
        "- Tabs include **Processes, Performance and Startup**",
        "Analyzing **CPU and RAM usage** helps identify bottlenecks and optimize performance."
      ]),
      note("resmon", "Using Resource Monitor", "admin", [
        "Launch from **Task Manager > Performance tab > Open Resource Monitor**.",
        "- Gives **detailed insight** into CPU, memory, disk and network usage",
        "- Helps **pinpoint resource-heavy processes**"
      ]),
      note("gpucpu", "GPU vs CPU", "admin", [
        "The GPU and CPU handle different workloads.",
        "- The **GPU** specializes in **rendering 3D graphics** for games and applications, enhancing visual performance",
        "- The **CPU** manages **general computing tasks** and controls system operations"
      ]),
      note("services", "Managing services", "admin", [
        "Use `services.msc` to view and manage background services.",
        "- **Disable unnecessary services** to improve performance",
        "- Be cautious: disabling **critical services** can cause issues"
      ]),
      note("battery", "Battery life on portable PCs", "admin", [
        "Portable PCs have several ways to extend battery life.",
        "- Use **Battery Saver** mode to extend battery life",
        "- Adjust **screen brightness** and **background activity**",
        "- Check battery usage in **Settings > System > Power & battery**"
      ]),
      note("power", "Power management on desktops", "admin", [
        "Desktops use power plans to balance performance and efficiency.",
        "- Configure power plans in **Control Panel > Power Options**",
        "- Choose between **Balanced, Power Saver or High Performance**",
        "- Customize **sleep and display settings** for efficiency"
      ]),
      note("perfbest", "Best practices for performance", "admin", [
        "Five habits keep Windows performing well.",
        "- 1. Keep the **system updated**",
        "- 2. Run regular **malware scans**",
        "- 3. Limit **startup programs**",
        "- 4. Clean up **disk space**",
        "- 5. Monitor **system health** regularly"
      ]),
      note("trouble", "Systematic troubleshooting and printer problems", "admin", [
        "Effective troubleshooting needs a **structured approach** to identify and resolve hardware and software issues.",
        "- **Hardware problems:** check **Device Manager** and **update drivers** first",
        "- **Printer problems** such as an **offline** status or **stuck queue**: restart the **Print Spooler** or **clear print jobs**",
        "Troubleshooting basics prepare students for support roles and system administration careers."
      ])
    ],
    glossary: [
      ["Plug-and-play", "Hardware that Windows detects and configures automatically when connected.", ""],
      ["Device Manager", "Tool to view hardware, update or uninstall drivers and troubleshoot devices.", ""],
      ["Driver", "Software that lets Windows communicate with hardware.", ""],
      ["Safely Remove Hardware", "Eject step that prevents USB data corruption.", ""],
      ["Print queue", "List of pending print jobs that can be paused or cancelled.", ""],
      ["Print Spooler", "Service that manages print jobs; restart it to fix stuck queues.", ""],
      ["GPU", "Graphics Processing Unit; renders 3D graphics.", ""],
      ["CPU", "Central Processing Unit; handles general computing tasks.", ""],
      ["Bluetooth pairing", "Linking two discoverable devices within range.", ""],
      ["System Information", "msinfo32 tool showing detailed hardware and software configuration.", ""],
      ["Task Manager", "Monitors processes, performance and startup items.", ""],
      ["Resource Monitor", "Detailed live view of CPU, memory, disk and network by process.", ""],
      ["services.msc", "Console for managing background services.", ""],
      ["Battery Saver", "Mode that extends battery life by limiting background activity.", ""],
      ["Power plan", "Balanced, Power Saver or High Performance settings.", ""],
      ["Bottleneck", "Resource that limits overall system performance.", ""]
    ],
    cards: [
      ["Where do you view and troubleshoot USB ports?", "Device Manager."],
      ["Why safely eject a USB drive?", "To prevent data corruption."],
      ["Where do you add a printer?", "Settings > Devices > Printers & scanners."],
      ["How do you fix an offline printer or stuck queue?", "Restart the Print Spooler or clear print jobs."],
      ["Where do you change resolution and multiple displays?", "Settings > System > Display."],
      ["Where are audio devices configured?", "Settings > System > Sound."],
      ["Shortcut to open Task Manager?", "Ctrl+Shift+Esc (or right-click the taskbar)."],
      ["How do you open Resource Monitor?", "Task Manager > Performance tab > Open Resource Monitor."],
      ["Command to manage services?", "services.msc."],
      ["Where do you check battery usage?", "Settings > System > Power & battery."],
      ["Where do you configure desktop power plans?", "Control Panel > Power Options."],
      ["Three Windows power plans?", "Balanced, Power Saver, High Performance."],
      ["GPU versus CPU?", "GPU renders 3D graphics; CPU handles general computing."],
      ["Two requirements for Bluetooth pairing?", "Both devices discoverable and within range."],
      ["First steps for hardware problems?", "Check Device Manager and update drivers."],
      ["Five performance best practices?", "Update system, malware scans, limit startup programs, clean disk space, monitor health."]
    ],
    quiz: [
      Q("Which tool is used to view and troubleshoot USB ports?", "Device Manager", "Device Manager lists hardware and driver status.", "Task Scheduler", "Disk Cleanup", "Snipping Tool"),
      Q("Why should you safely eject a USB drive?", "To prevent data corruption", "Pending writes must finish first.", "To update drivers", "To speed up the PC", "To format the drive"),
      Q("Where do you add a printer?", "Settings > Devices > Printers & scanners", "Printers are added in Settings.", "Control Panel > Programs", "Task Manager > Startup", "services.msc"),
      Q("A printer shows offline with stuck jobs. What is a good fix?", "Restart the Print Spooler or clear print jobs", "The spooler manages the queue.", "Reinstall Windows", "Replace the monitor", "Disable Bluetooth"),
      Q("Where do you adjust resolution and orientation?", "Settings > System > Display", "Display settings control screens.", "Settings > System > Sound", "Device Manager > USB", "Power Options"),
      Q("Where do you set default input and output audio devices?", "Settings > System > Sound", "Sound settings manage audio devices.", "Settings > System > Display", "Printers & scanners", "Resource Monitor"),
      Q("Which shortcut opens Task Manager?", "Ctrl+Shift+Esc", "Also available by right-clicking the taskbar.", "Ctrl+Alt+T", "Win+Tab", "Alt+F4"),
      Q("How do you open Resource Monitor from Task Manager?", "Performance tab > Open Resource Monitor", "Link at the bottom of the Performance tab.", "Startup tab > Disable", "Processes tab > End task", "Details tab > Set priority"),
      Q("Which console manages background services?", "services.msc", "Services management console.", "devmgmt.msc", "diskmgmt.msc", "msinfo32"),
      Q("What is the risk of disabling services?", "Disabling critical services can cause issues", "Only disable ones you understand.", "It always speeds up Windows", "It deletes drivers", "Nothing happens"),
      Q("Which mode extends laptop battery life?", "Battery Saver", "Limits background activity and brightness.", "High Performance", "Safe Mode", "Maximum brightness"),
      Q("Which are the desktop power plan choices?", "Balanced, Power Saver, High Performance", "Set in Power Options.", "Fast, Slow, Off", "Sleep, Hibernate, Restart", "Eco, Turbo, Safe"),
      Q("Which component specializes in rendering 3D graphics?", "GPU", "The CPU handles general tasks.", "CPU", "RAM", "BIOS"),
      Q("What is required for Bluetooth pairing?", "Discoverable devices within range", "Both devices must be discoverable and in range.", "A USB cable", "An Ethernet link", "Matching brand names"),
      Q("Which tool gives extensive hardware and software configuration details?", "System Information (msinfo32)", "Useful for diagnosing bottlenecks.", "Paint", "Calculator", "Clipboard"),
      Q("What should you do first for a hardware problem?", "Check Device Manager and update drivers", "Standard first steps.", "Reformat the disk", "Buy new hardware", "Disable the firewall"),
      Q("Which is a performance best practice?", "Limit startup programs", "Fewer startup items speed boot and use less RAM.", "Disable Windows Update", "Turn off malware scans", "Fill the disk")
    ],
    commands: [
      { name: "devmgmt.msc", shell: "Run", desc: "Open Device Manager.", syntax: "devmgmt.msc", examples: [] },
      { name: "services.msc", shell: "Run", desc: "Open the Services console.", syntax: "services.msc", examples: [] },
      { name: "msinfo32", shell: "Run", desc: "Open System Information.", syntax: "msinfo32", examples: [] },
      { name: "taskmgr", shell: "Run", desc: "Open Task Manager (or Ctrl+Shift+Esc).", syntax: "taskmgr", examples: [] },
      { name: "resmon", shell: "Run", desc: "Open Resource Monitor.", syntax: "resmon", examples: [] },
      { name: "powercfg", shell: "CMD (admin)", desc: "View and manage power plans and battery reports.", syntax: "powercfg /list", examples: ["powercfg /list", "powercfg /batteryreport"] },
      { name: "net stop spooler", shell: "CMD (admin)", desc: "Stop the Print Spooler; start it again with net start spooler.", syntax: "net stop spooler", examples: ["net stop spooler", "net start spooler"] },
      { name: "Restart-Service", shell: "PowerShell (admin)", desc: "Restart a service such as the spooler.", syntax: "Restart-Service -Name Spooler", examples: ["Restart-Service -Name Spooler"] },
      { name: "systeminfo", shell: "CMD", desc: "Show OS and hardware summary.", syntax: "systeminfo", examples: ["systeminfo"] }
    ],
    tasks: [
      task("usbeject", "Safely eject a USB drive", "Taskbar > Safely Remove Hardware", "Avoid corruption.", [
        "Click the **Safely Remove Hardware and Eject Media** icon in the system tray.",
        "Select the USB drive and wait for the **safe to remove** message.",
        "Then unplug the device."
      ]),
      task("driver", "Update or uninstall a driver", "Device Manager", "Fix hardware issues.", [
        "Right-click **Start** and open **Device Manager**.",
        "Right-click the device and choose **Update driver** or **Uninstall device**.",
        "Restart if prompted, or choose **Scan for hardware changes**."
      ]),
      task("printer", "Add a printer and set the default", "Settings > Devices > Printers & scanners", "Print successfully.", [
        "Open **Settings > Devices > Printers & scanners**.",
        "Click **Add device** and select the printer.",
        "Open the printer and choose **Set as default**."
      ]),
      task("spooler", "Clear a stuck print queue", "Services", "Fix printer problems.", [
        "Open **services.msc**.",
        "Right-click **Print Spooler** and choose **Stop**.",
        "Clear pending jobs, then **Start** the service again."
      ], "Or cancel jobs from the print queue window first."),
      task("display", "Configure multiple displays", "Settings > System > Display", "Set resolution and orientation.", [
        "Open **Settings > System > Display**.",
        "Choose a monitor and set **resolution** and **orientation**.",
        "Under **Multiple displays**, pick duplicate or extend."
      ]),
      task("sound", "Set default audio devices", "Settings > System > Sound", "Choose output and input.", [
        "Open **Settings > System > Sound**.",
        "Select the **output** and **input** devices.",
        "Use **Test** to verify sound."
      ]),
      task("bluetooth", "Pair a Bluetooth device", "Settings > Bluetooth & devices", "Connect a peripheral wirelessly.", [
        "Make sure the peripheral is **discoverable** and within range.",
        "Open **Settings > Bluetooth & devices** and click **Add device > Bluetooth**.",
        "Select the device and confirm pairing."
      ]),
      task("resmon", "Find a resource-heavy process", "Task Manager and Resource Monitor", "Locate bottlenecks.", [
        "Press **Ctrl+Shift+Esc** and open the **Performance** tab.",
        "Click **Open Resource Monitor**.",
        "Sort the CPU, Memory, Disk and Network tabs to find the heaviest process."
      ]),
      task("startup", "Limit startup programs", "Task Manager > Startup", "Improve boot time.", [
        "Open **Task Manager** and select the **Startup** tab.",
        "Right-click unneeded items and choose **Disable**."
      ]),
      task("power", "Choose a power plan", "Control Panel > Power Options", "Balance performance and efficiency.", [
        "Open **Control Panel > Power Options**.",
        "Select **Balanced, Power Saver or High Performance**.",
        "Use **Change plan settings** to customize sleep and display timeouts."
      ])
    ]
  });
})();
