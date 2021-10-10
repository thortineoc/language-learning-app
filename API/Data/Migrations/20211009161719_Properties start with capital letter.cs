using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Propertiesstartwithcapitalletter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Courses_courseId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Languages_languageFromId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Languages_languageToId",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Languages",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Courses",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "languageToId",
                table: "Courses",
                newName: "LanguageToId");

            migrationBuilder.RenameColumn(
                name: "languageFromId",
                table: "Courses",
                newName: "LanguageFromId");

            migrationBuilder.RenameColumn(
                name: "courseId",
                table: "Courses",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_languageToId",
                table: "Courses",
                newName: "IX_Courses_LanguageToId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_languageFromId",
                table: "Courses",
                newName: "IX_Courses_LanguageFromId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Categories",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "courseId",
                table: "Categories",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_courseId",
                table: "Categories",
                newName: "IX_Categories_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Courses_CourseId",
                table: "Categories",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Languages_LanguageFromId",
                table: "Courses",
                column: "LanguageFromId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Languages_LanguageToId",
                table: "Courses",
                column: "LanguageToId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Courses_CourseId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Languages_LanguageFromId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Languages_LanguageToId",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Languages",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Courses",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "LanguageToId",
                table: "Courses",
                newName: "languageToId");

            migrationBuilder.RenameColumn(
                name: "LanguageFromId",
                table: "Courses",
                newName: "languageFromId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Courses",
                newName: "courseId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_LanguageToId",
                table: "Courses",
                newName: "IX_Courses_languageToId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_LanguageFromId",
                table: "Courses",
                newName: "IX_Courses_languageFromId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Categories",
                newName: "courseId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_CourseId",
                table: "Categories",
                newName: "IX_Categories_courseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Courses_courseId",
                table: "Categories",
                column: "courseId",
                principalTable: "Courses",
                principalColumn: "courseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Languages_languageFromId",
                table: "Courses",
                column: "languageFromId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Languages_languageToId",
                table: "Courses",
                column: "languageToId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
