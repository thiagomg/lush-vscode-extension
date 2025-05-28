---@class env
env = {}

---@param new_dir string
function env.pushd(new_dir) end

---@return string
function env.pwd() end

---@class fs
fs = {}

---@param path string
function fs.mkdir(path) end

---@param src string
---@param target string
function fs.copy(src, target) end

---@class os
os = {}

---@return string
function os.name() end

---@return table
function os.proc_names() end
