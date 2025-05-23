import React from "react"
import { IHaiClineTask, IHaiTask } from "../../interfaces/hai-task.interface"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import CopyClipboard from "../common/CopyClipboard"

// Interface for the highlighted task structure
interface IHighlightedHaiTask {
	original: IHaiTask
	highlighted: IHaiTask
}

interface HaiTaskComponentProps {
	id: string
	prdId: string
	name: string
	description: string
	task: IHighlightedHaiTask
	onTaskClick: (task: IHaiTask) => void
	onTaskSelect: (task: IHaiClineTask) => void
}

const HaiTaskComponent: React.FC<HaiTaskComponentProps> = ({ id, prdId, name, description, task, onTaskSelect, onTaskClick }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				width: "100%",
				minWidth: 0,
				gap: "8px",
				padding: "8px 0",
			}}>
			<div
				style={{
					flex: 1,
					minWidth: 0,
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					padding: "0 8px",
					display: "flex",
					flexDirection: "column",
				}}>
				<div
					style={{
						flex: 1,
						minWidth: 0,
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<span
						style={{
							fontSize: "12px",
							fontWeight: "bold",
							color: "var(--vscode-descriptionForeground)",
						}}>
						<span dangerouslySetInnerHTML={{ __html: task.highlighted.id }} />
						{task.highlighted.subTaskTicketId && (
							<span
								style={{
									fontSize: "12px",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
								}}
								dangerouslySetInnerHTML={{
									__html: ` • ${task.highlighted.subTaskTicketId}`,
								}}
							/>
						)}{" "}
					</span>
					{task.original.status === "Completed" && (
						<span
							className={`codicon codicon-pass-filled`}
							style={{ marginLeft: "4px", color: "green", fontSize: "13px" }}
						/>
					)}
				</div>
				<span
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
						overflowWrap: "anywhere",
					}}
					dangerouslySetInnerHTML={{ __html: task.highlighted.list }}
				/>
			</div>

			<div
				style={{
					display: "flex",
					gap: "8px",
					flexShrink: 0,
				}}>
				<VSCodeButton
					appearance="icon"
					title="Execute Task"
					onClick={() => {
						onTaskSelect({
							context: `${name}: ${description}`,
							...task.original,
							id: `${prdId}-${id}-${task.original.id}`,
						})
					}}>
					<span className="codicon codicon-play" style={{ fontSize: 14, cursor: "pointer" }} />
				</VSCodeButton>
				<CopyClipboard
					title="Copy Task"
					onCopyContent={() => {
						return `Task (${task.original.id}): ${task.original.list}\nAcceptance: ${task.original.acceptance}\n\nContext:\nStory (${id}): ${name}\nStory Acceptance: ${description}\n`
					}}
				/>
				<VSCodeButton appearance="icon" title="View Task" onClick={() => onTaskClick(task.original)}>
					<span className="codicon codicon-eye" style={{ fontSize: 14, cursor: "pointer" }} />
				</VSCodeButton>
			</div>
		</div>
	)
}
export default HaiTaskComponent
