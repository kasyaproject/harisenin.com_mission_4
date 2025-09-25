// Ambil data todo dari localStorage (jika ada)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Kalau belum ada data, isi dengan contoh awal
if (!todos || todos.length === 0) {
  let todos = [
    {
      id: 1,
      title: "Belajar JavaScript",
      description: "Menyelesaikan materi DOM dan localStorage",
      date: "19/09/2025",
      priority: "high",
    },
    {
      id: 2,
      title: "Olahraga pagi",
      description: "Jogging 3 km di taman dekat rumah",
      date: "21/09/2025",
      priority: "medium",
    },
    {
      id: 3,
      title: "Meeting kerja",
      description: "Diskusi project dengan tim via Zoom",
      date: "25/09/2025",
      priority: "high",
    },
    {
      id: 4,
      title: "Jalan-jalan",
      description: "Pergi ke pantai bersama teman-teman",
      date: "01/10/2025",
      priority: "low",
    },
    {
      id: 5,
      title: "Beli buku",
      description: "Membeli buku JavaScript lanjutan di toko buku",
      date: "15/10/2025",
      priority: "medium",
    },
    {
      id: 6,
      title: "Nonton film",
      description: "Menonton film terbaru di bioskop",
      date: "05/11/2025",
      priority: "low",
    },
    {
      id: 7,
      title: "Coding React",
      description: "Mengerjakan latihan membuat todo app dengan React",
      date: "12/11/2025",
      priority: "high",
    },
    {
      id: 8,
      title: "Liburan keluarga",
      description: "Mengunjungi rumah nenek di kampung",
      date: "20/12/2025",
      priority: "medium",
    },
    {
      id: 9,
      title: "Belanja akhir tahun",
      description: "Membeli kebutuhan rumah untuk libur panjang",
      date: "28/12/2025",
      priority: "high",
    },
    {
      id: 10,
      title: "Tahun Baru",
      description: "Merayakan malam tahun baru bersama keluarga",
      date: "31/12/2025",
      priority: "medium",
    },
    {
      id: 11,
      title: "Mulai diet sehat",
      description: "Makan lebih banyak sayur, kurangi gorengan",
      date: "05/01/2026",
      priority: "high",
    },
    {
      id: 12,
      title: "Belajar Node.js",
      description: "Mendalami Express.js dan REST API",
      date: "10/01/2026",
      priority: "high",
    },
    {
      id: 13,
      title: "Main futsal",
      description: "Pertandingan persahabatan dengan tim RT",
      date: "15/01/2026",
      priority: "low",
    },
    {
      id: 14,
      title: "Workshop UI/UX",
      description: "Ikut pelatihan desain UI modern",
      date: "25/01/2026",
      priority: "medium",
    },
    {
      id: 15,
      title: "Project freelance",
      description: "Mengerjakan website client toko online",
      date: "03/02/2026",
      priority: "high",
    },
    {
      id: 16,
      title: "Berenang",
      description: "Latihan renang di kolam renang umum",
      date: "09/02/2026",
      priority: "low",
    },
    {
      id: 17,
      title: "Belajar TypeScript",
      description: "Mempelajari dasar-dasar TypeScript untuk project React",
      date: "20/02/2026",
      priority: "high",
    },
    {
      id: 18,
      title: "Hackathon event",
      description: "Ikut lomba coding maraton 48 jam",
      date: "27/02/2026",
      priority: "high",
    },
    {
      id: 19,
      title: "Camping",
      description: "Camping di gunung bersama sahabat",
      date: "10/03/2026",
      priority: "medium",
    },
    {
      id: 20,
      title: "Belajar Laravel",
      description: "Mengerjakan project CRUD dengan Laravel 11",
      date: "20/03/2026",
      priority: "high",
    },
  ];

  // simpan ke localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Simpan todo ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todo ke layar (dengan filter)
function renderTodos(filter = "today") {
  let listId = "";
  let filteredTodos = todos;

  // Tentukan target UL
  if (filter === "today") {
    listId = "todayList";

    const today = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    filteredTodos = todos.filter((todo) => todo.date === today);
  }

  if (filter === "week") {
    listId = "weekList";

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Sabtu

    filteredTodos = todos.filter((todo) => {
      const [day, month, year] = todo.date.split("/").map(Number);
      const todoDate = new Date(year, month - 1, day);
      return todoDate >= startOfWeek && todoDate <= endOfWeek;
    });
  }

  if (filter === "month") {
    listId = "monthList";

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    filteredTodos = todos.filter((todo) => {
      const [day, todoMonth, todoYear] = todo.date.split("/").map(Number);
      return todoMonth - 1 === month && todoYear === year;
    });
  }

  // Render ke target list
  const list = document.getElementById(listId);
  list.innerHTML = "";

  if (filteredTodos.length === 0) {
    list.innerHTML = `<li class="text-gray-500 text-sm p-2">No todos found</li>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className =
      "flex flex-col items-center justify-between px-1 py-2 border-gray-200 border-y-2 group";

    li.innerHTML = `
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2 flex-1 ">
            <input
              type="checkbox"
              class="w-4 h-4 hover:cursor-pointer"
              ${todo.done ? "checked" : ""}
              onclick="markAsDone(${todo.id})"
            />
            <p class="text-sm font-semibold ${
              todo.done ? "line-through text-gray-400" : "text-gray-500"
            }">${todo.title}</p>
          </div>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="group-hover:rotate-90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
              fill="#3A3541"
              fill-opacity="0.54"
            />
          </svg>
        </div>

        <div
          class="items-start justify-between hidden w-full px-2  mt-1 gap-2 text-sm font-semibold text-gray-500 group-hover:flex"
        >
          <div class="flex-1">
            <table>
              <tr>
                <td class="p-1 align-top">Desc</td>
                <td class="p-1 align-top">:</td>
                <td class="p-1">${todo.description}</td>
              </tr>
              <tr>
                <td class="p-1 align-top">Prior</td>
                <td class="p-1 align-top">:</td>
                <td class="p-1">${
                  todo.priority === "high"
                    ? `<span class="px-1.5 py-0.5 text-xs font-semibold text-red-600 bg-red-100 rounded">High</span>`
                    : todo.priority === "medium"
                    ? `<span class="px-1.5 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded">Medium</span>`
                    : `<span class="px-1.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded">Low</span>`
                }</td>
              </tr>
              <tr>
                <td class="p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 fill-gray-500"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708"
                    />
                    <path
                      d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                    />
                  </svg>
                </td>
                <td class="p-1">:</td>
                <td class="p-1">${todo.date}</td>
              </tr>
            </table>
          </div>

          <div>
            <button
              class="px-1 py-0.5 mr-2 text-white bg-red-500 rounded-sm hover:cursor-pointer"
              onclick="deleteTodo(${todo.id})"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-4 h-4 bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
      `;

    list.appendChild(li);
  });
}

// Tambah todo baru
document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const date = document.getElementById("date");
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;

  const newTodo = {
    id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1, // auto id
    title: title.value,
    description: description.value,
    date: date.value,
    done: false,
    priority: priority, // simpan priority
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos("today");
  renderTodos("week");
  renderTodos("month");
  resetForm();
});

// Reset form
function resetForm() {
  // reset semua field
  document.getElementById("todoForm").reset();

  // ambil elemen input date
  const dateInput = document.getElementById("date");

  // set tanggal hari ini (format yyyy-mm-dd)
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  dateInput.value = today;
}

// Mark as Done
function markAsDone(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos();
  renderTodos("today");
  renderTodos("week");
  renderTodos("month");
}

// Delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos("today");
  renderTodos("week");
  renderTodos("month");
}

// Render Pertama kali masing-masing list
renderTodos("today");
renderTodos("week");
renderTodos("month");
