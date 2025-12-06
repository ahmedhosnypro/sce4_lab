# Running the Backend in VS Code

## Quick Start - 3 Steps

### Step 1: Open the Task Menu
Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type **"Tasks: Run Task"**

### Step 2: Select the Backend Task
You'll see:
- 🚀 **Run Backend - EmployeeService** ← Click this one
- 🔄 Run Frontend - React Vite
- build
- watch
- publish

### Step 3: Done! 
The backend will start automatically and the terminal will appear at the bottom showing:
```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

---

## Alternative Ways to Run

### Method 1: Keyboard Shortcut (Fastest)
```
Ctrl+Shift+P → "Tasks: Run Task" → Select "🚀 Run Backend - EmployeeService"
```

### Method 2: From Terminal Tab
1. Open a terminal in VS Code: `` Ctrl+` ``
2. Run:
```bash
cd EmployeeService
dotnet run
```

### Method 3: Use the Watch Task (Auto-Restart on Code Changes)
Press `Ctrl+Shift+P` and select **"watch"**
- This runs `dotnet watch run` which auto-reloads when you change code

---

## Run Both Backend and Frontend Together

### Option A: Use Two Terminals
1. Terminal 1: Run `🚀 Run Backend - EmployeeService` (Ctrl+Shift+P → Tasks)
2. Terminal 2: Run `🔄 Run Frontend - React Vite` (Ctrl+Shift+P → Tasks)

### Option B: Run Both in One Command
Open terminal and run:
```bash
# Terminal 1
cd EmployeeService && dotnet run

# Terminal 2 (new terminal with Ctrl+Shift+`)
cd front && bun run dev
```

---

## What to Look For

### ✅ Backend is Running Successfully
```
Building...
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (114ms) [Parameters=[], CommandType='Text']

Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
Application started. Press Ctrl+C to shut down.
```

### ✅ Frontend is Running Successfully
```
  VITE v7.2.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Test the Backend

Open a new terminal and run:
```bash
curl http://localhost:5000/api/employees
```

You should see all 10 employees in JSON format.

---

## Debugging

### Breakpoints in Backend Code
1. Click on line number to set a breakpoint
2. Make sure backend is running
3. When code hits that line, it will pause
4. Use VS Code debug console to inspect variables

### View Logs
- Backend logs appear in the terminal at the bottom
- Frontend logs appear in browser console (F12)

---

## Stop the Server

- **Backend:** Press `Ctrl+C` in the terminal
- **Frontend:** Press `Ctrl+C` in the terminal

---

## Quick Tips

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Open command palette (tasks, commands, etc.) |
| `` Ctrl+` `` | Toggle terminal on/off |
| `Ctrl+J` | Open panel (terminal, problems, etc.) |
| `Ctrl+Shift+C` | Open new terminal |
| `Ctrl+K Ctrl+W` | Close current terminal |

---

## Common Issues

**"Port 5000 already in use"**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
dotnet run --urls "http://localhost:5001"
```

**"Tasks not appearing"**
- Make sure you have the workspace open (File → Open Folder → select sce4_lab)
- The .vscode/tasks.json file must be in the workspace root

**"dotnet command not found"**
- Ensure .NET SDK is installed: `dotnet --version`
- May need to reload VS Code window (Ctrl+R)

---

## Next Step

1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select **"🚀 Run Backend - EmployeeService"**
4. Watch it start!
