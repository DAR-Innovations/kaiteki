package org.kaiteki.backend.teams.modules.analytics.service;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.model.dto.TeamMembersFilterDTO;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.analytics.models.dto.ExportMembersDTO;
import org.kaiteki.backend.teams.modules.performance.models.dto.TeamMemberPerformanceDTO;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.kaiteki.backend.teams.modules.tasks.models.dto.ExportTasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksFilterDTO;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.print.attribute.standard.Media;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class TeamMemberAnalyticsExporter {
    private final TeamsService teamsService;
    private final TeamMembersService teamMembersService;
    private final TeamMemberPerformanceService teamMemberPerformanceService;

    public ResponseEntity<byte[]> exportTeamMembers(ExportMembersDTO dto) throws IOException {
        Teams team = teamsService.getTeamById(dto.getTeamId());
        List<TeamMembersDTO> teamMembers = teamMembersService.getAll(team, false);
        List<TeamMemberPerformanceDTO> teamMemberPerformanceDTOS = teamMemberPerformanceService.getPerformanceDTOByTeamFromStart(team.getId());

        System.out.println("LIST SIZEEEE " + teamMemberPerformanceDTOS.size());
        System.out.println("LIST " + teamMemberPerformanceDTOS.toString());


        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Members");

            // Create bold font style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);

            // Create CellStyle with bold font
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Create header row and make it bold
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Name");
            headerRow.createCell(1).setCellValue("Position");
            headerRow.createCell(2).setCellValue("Email");
            headerRow.createCell(3).setCellValue("Joined Date");

            // Create a cell style for percentage format
            CellStyle percentageCellStyle = workbook.createCellStyle();
            percentageCellStyle.setDataFormat(workbook.createDataFormat().getFormat("0.00%"));

            // Populate months as headers
            Map<String, Integer> monthColumns = new HashMap<>();
            int columnIndex = 4;
            for (TeamMemberPerformanceDTO performance : teamMemberPerformanceDTOS) {
                ZonedDateTime createdDate = performance.getCreatedDate();
                String monthYear = createdDate.getMonth().toString() + ", " + createdDate.getYear();
                if (!monthColumns.containsKey(monthYear)) {
                    monthColumns.put(monthYear, columnIndex++);
                    headerRow.createCell(monthColumns.get(monthYear)).setCellValue(monthYear);
                }
            }

            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // Populate data rows
            int rowNum = 1;
            for (TeamMembersDTO member : teamMembers) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(member.getFullName());
                row.createCell(1).setCellValue(member.getPosition());
                row.createCell(2).setCellValue(member.getEmail());
                row.createCell(3).setCellValue(member.getJoinedDate().format(dateFormatter));

                // Initialize performance columns with 0
                Map<String, BigDecimal> performanceMap = new HashMap<>();
                for (String monthYear : monthColumns.keySet()) {
                    performanceMap.put(monthYear, BigDecimal.ZERO);
                }

                // Populate performance data for the member
                for (TeamMemberPerformanceDTO performance : teamMemberPerformanceDTOS) {
                    if (performance.getMember().getId().equals(member.getId())) {
                        ZonedDateTime createdDate = performance.getCreatedDate();
                        String monthYear = createdDate.getMonth().toString() + ", " + createdDate.getYear();
                        BigDecimal performanceValue = performance.getPerformance();
                        performanceMap.put(monthYear, performanceValue);
                    }
                }

                // Set performance data to corresponding columns
                for (Map.Entry<String, BigDecimal> entry : performanceMap.entrySet()) {
                    String monthYear = entry.getKey();
                    BigDecimal performanceValue = entry.getValue();
                    Integer columnIndexForMonth = monthColumns.get(monthYear);
                    Cell cell = row.createCell(columnIndexForMonth);
                    cell.setCellValue(performanceValue.doubleValue());
                    cell.setCellStyle(percentageCellStyle);
                }
            }

            // After populating data rows
            for (int col = 0; col < columnIndex; col++) {
                sheet.autoSizeColumn(col);
            }

            // Write the workbook to a ByteArrayOutputStream
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            workbook.write(stream);

            // Set response headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            ContentDisposition contentDisposition = ContentDisposition.builder("inline")
                    .filename(generateMembersFileName(team.getName()))
                    .build();

            headers.setContentDisposition(contentDisposition);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(stream.toByteArray());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to download the team members");
        }
    }

    private String generateMembersFileName(String teamName) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
        String timestamp = ZonedDateTime.now().format(formatter);

        return String.format("Team_%s_Performance_%s.xlsx",
                teamName.replaceAll("\\s+", "_"),
                timestamp
        );
    }

}
