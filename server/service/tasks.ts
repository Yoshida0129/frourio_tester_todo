import { getRepository } from 'typeorm'
import { Task } from '$/entity/Task'

const taskRepository = () => getRepository(Task)

export const getTasks = async (limit?: number) => (await taskRepository().find()).slice(0, limit)

export const createTask = (label: Task['label']) => {
  const task = new Task()
  task.label = label
  return taskRepository().save(task)
}

export const updateTask = async (
  id: Task['id'],
  partialTask: Partial<Pick<Task, 'label' | 'done'>>
) => {
  const task = await taskRepository().findOne({ id })
  if (!task) return

  task.label = partialTask.label ?? task.label
  task.done = partialTask.done ?? task.done
  await taskRepository().save(task)
}

export const deleteTask = (id: Task['id']) => taskRepository().delete({ id })
