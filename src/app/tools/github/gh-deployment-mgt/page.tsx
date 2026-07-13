'use client'

import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import type { SearchParams, TableData } from './types'
import { reqDepartments, reqDeleteDepartment } from './services'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components/ui'
import { ChevronDown, ChevronUp } from 'lucide-react'

const defaultSearchParams: SearchParams = {
  owner: '',
  repo: '',
  token: '',
  sha: '',
  ref: '',
  task: '',
  environment: '',
  per_page: 10,
  page: 1,
}

const searchItems = [
  { label: 'Owner', field: 'owner', placeholder: '请输入 Owner（必填）' },
  { label: 'Repo', field: 'repo', placeholder: '请输入 Repo（必填）' },
  { label: 'Token', field: 'token', placeholder: '请输入 Token（必填）' },
  { label: 'SHA', field: 'sha', placeholder: '请输入 SHA' },
  { label: 'Ref', field: 'ref', placeholder: '请输入 Ref' },
  { label: 'Task', field: 'task', placeholder: '请输入 Task' },
  { label: 'Environment', field: 'environment', placeholder: '请输入 Environment' },
]

const View: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCollapse, setIsCollapse] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams)
  const [tableData, setTableData] = useState<TableData[]>([])

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      const res = await reqDepartments(searchParams)
      if (Array.isArray(res)) {
        setTableData(res)
      } else {
        throw new Error('请求失败')
      }
    } catch (error) {
      console.error(error)
      setTableData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => setSearchParams(defaultSearchParams)

  const handleDelete = async (record: TableData) => {
    try {
      const params = {
        owner: searchParams.owner,
        repo: searchParams.repo,
        token: searchParams.token,
        id: record.id,
      }
      await reqDeleteDepartment(params)
      // 删除成功后重新查询刷新数据
      handleSearch()
    } catch (error) {
      console.error(error)
    }
  }

  const inputClass =
    'border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border w-full rounded-md border px-2.5 py-1.5 text-sm outline-none transition-colors'

  const visibleItems = isCollapse ? searchItems.slice(0, 3) : searchItems
  const canSearch = searchParams.owner !== '' && searchParams.repo !== '' && searchParams.token !== ''

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">Deployments</h1>
        <p className="text-muted-foreground text-sm">GitHub Deployment 管理工具</p>
      </div>

      {/* Search form */}
      <div className="border-border/60 mb-5 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <label htmlFor={item.label} className="text-muted-foreground w-24 shrink-0 text-xs">
                {item.label}
              </label>
              <input
                id={item.label}
                className={inputClass}
                type={item.field === 'token' ? 'password' : 'text'}
                placeholder={item.placeholder}
                value={searchParams[item.field as keyof SearchParams] as string}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchParams({ ...searchParams, [item.field!]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleSearch} disabled={!canSearch || isLoading}>
            {isLoading ? '查询中…' : '查询'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
            重置
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapse(!isCollapse)}
            className="text-muted-foreground ml-auto flex items-center gap-1"
          >
            {isCollapse ? (
              <>
                展开 <ChevronDown className="size-3.5" />
              </>
            ) : (
              <>
                收起 <ChevronUp className="size-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border/60 border-b">
              {['#', 'ID', 'SHA', 'Ref', 'Task', 'Environment', '操作'].map((col) => (
                <th key={col} className="text-muted-foreground pr-4 pb-2 text-left text-xs font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-muted-foreground py-8 text-center text-sm">
                  <div className="border-border mx-auto mb-2 size-5 animate-spin rounded-full border-2 border-t-transparent" />
                  加载中...
                </td>
              </tr>
            )}

            {!isLoading && tableData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-muted-foreground/50 py-10 text-center text-sm">
                  暂无数据
                </td>
              </tr>
            )}

            {!isLoading &&
              tableData.map((record, index) => (
                <tr key={record.id} className="border-border/30 border-b last:border-0">
                  <td className="py-2.5 pr-4 text-xs">{index + 1}</td>
                  <td className="text-muted-foreground max-w-[120px] truncate py-2.5 pr-4 font-mono text-xs">
                    {record.id}
                  </td>
                  <td className="text-muted-foreground max-w-[120px] truncate py-2.5 pr-4 font-mono text-xs">
                    {record.sha}
                  </td>
                  <td className="max-w-[120px] truncate py-2.5 pr-4 text-xs">{record.ref}</td>
                  <td className="max-w-[120px] truncate py-2.5 pr-4 text-xs">{record.task}</td>
                  <td className="max-w-[120px] truncate py-2.5 pr-4 text-xs">{record.environment}</td>
                  <td className="py-2.5">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-destructive hover:text-destructive/80 text-xs transition-colors">
                          删除
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认要删除该记录吗？</AlertDialogTitle>
                          <AlertDialogDescription>
                            此操作不可逆。该 Deployment 记录将被永久删除。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(record)}>确认删除</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default View
